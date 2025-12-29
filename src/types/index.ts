export type UserRole = 'customer' | 'mitra';

export type TransactionStatus = 'completed';

export type RedemptionStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

export type RedemptionMethod = 'vending' | 'agent' | 'delivery';

export type RewardType = 'product' | 'voucher';

export type PackagingCategory = 'PET Bottle' | 'Aluminum' | 'Cardboard' | 'Sachet' | 'Glass';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  points?: number; // only for customers
  qrCode?: string; // unique identifier for customer
  commission?: number; // only for mitra
  createdAt: number;
  avatar?: string; // base64 or url
}

export interface PackagingType {
  id: string;
  name: string;
  category: PackagingCategory;
  points: number;
  barcode: string;
  image: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName?: string;
  mitraId: string;
  mitraName?: string;
  packagingType: PackagingType;
  pointsEarned: number;
  commission: number;
  location: string;
  timestamp: number;
  status: TransactionStatus;
}

export interface RewardItem {
  id: string;
  type: RewardType;
  name: string;
  points: number;
  stock: number;
  image: string;
  category: string;
  description?: string;
}

export interface CartItem {
  reward: RewardItem;
  quantity: number;
}

export interface RedemptionItem {
  rewardId: string;
  rewardName: string;
  quantity: number;
  points: number;
}

export interface Redemption {
  id: string;
  customerId: string;
  customerName?: string;
  items: RedemptionItem[];
  totalPoints: number;
  deliveryAddress: string;
  status: RedemptionStatus;
  timestamp: number;
  trackingNumber: string;
  redemptionMethod: RedemptionMethod;
  redemptionCode?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'qrCode'>) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface PointsContextType {
  updatePoints: (userId: string, points: number) => void;
  getUserTransactions: (userId: string) => Transaction[];
  getUserRedemptions: (userId: string) => Redemption[];
  createTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  createRedemption: (redemption: Omit<Redemption, 'id' | 'timestamp' | 'trackingNumber' | 'status'>) => void;
  getAllTransactions: () => Transaction[];
  updateRedemptionStatus: (redemptionId: string, status: RedemptionStatus) => void;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (reward: RewardItem, quantity: number) => void;
  removeFromCart: (rewardId: string) => void;
  updateQuantity: (rewardId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPoints: () => number;
}

export interface ScanSession {
  customerId: string;
  customerName: string;
  scannedItems: {
    packagingType: PackagingType;
    quantity: number;
  }[];
  totalPoints: number;
  totalCommission: number;
}

export interface LeaderboardEntry {
  mitraId: string;
  mitraName: string;
  bottlesCollected: number;
  totalCommission: number;
  rank: number;
}

export interface CollectionStats {
  today: {
    bottles: number;
    pointsIssued: number;
    commission: number;
  };
  thisWeek: {
    bottles: number;
    pointsIssued: number;
    commission: number;
  };
  thisMonth: {
    bottles: number;
    pointsIssued: number;
    commission: number;
  };
}
