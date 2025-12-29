import { v4 as uuidv4 } from 'uuid';
import type { User, PackagingType, RewardItem, Transaction, Redemption } from '../types';

export const packagingTypes: PackagingType[] = [
  // MILO Products
  {
    id: 'milo_pet_115',
    name: 'MILO Active Go PET 115ml',
    category: 'PET Bottle',
    points: 2,
    barcode: '8999908297105',
    image: 'milo_115.png'
  },
  {
    id: 'milo_pet_180',
    name: 'MILO Active Go PET 180ml',
    category: 'PET Bottle',
    points: 3,
    barcode: '8999908297181',
    image: 'milo_180.png'
  },
  {
    id: 'milo_uht_115',
    name: 'MILO UHT 115ml',
    category: 'Cardboard',
    points: 2,
    barcode: '8999908297501',
    image: 'milo_uht.png'
  },
  {
    id: 'milo_uht_200',
    name: 'MILO UHT 200ml',
    category: 'Cardboard',
    points: 2,
    barcode: '8999908297204',
    image: 'milo_uht_200.png'
  },
  // BEAR BRAND Products
  {
    id: 'bearbrand_189',
    name: 'BEAR BRAND Can 189ml',
    category: 'Aluminum',
    points: 8,
    barcode: '8992753600019',
    image: 'bearbrand_189.png'
  },
  {
    id: 'bearbrand_140',
    name: 'BEAR BRAND Gold White Tea 140ml',
    category: 'Aluminum',
    points: 7,
    barcode: '8992753601009',
    image: 'bearbrand_140.png'
  },
  // DANCOW Products
  {
    id: 'dancow_uht_110',
    name: 'DANCOW UHT 110ml',
    category: 'Cardboard',
    points: 2,
    barcode: '8999908298119',
    image: 'dancow_uht.png'
  },
  {
    id: 'dancow_uht_200',
    name: 'DANCOW FortiGro UHT 200ml',
    category: 'Cardboard',
    points: 2,
    barcode: '8999908298201',
    image: 'dancow_uht_200.png'
  },
  // NESCAFE Products
  {
    id: 'nescafe_pet_220',
    name: 'NESCAFE Ice RTD 220ml',
    category: 'PET Bottle',
    points: 3,
    barcode: '8999908501226',
    image: 'nescafe_220.png'
  },
  {
    id: 'nescafe_can_180',
    name: 'NESCAFE Original Can 180ml',
    category: 'Aluminum',
    points: 6,
    barcode: '8999908501189',
    image: 'nescafe_can.png'
  },
  // NESTEA Products
  {
    id: 'nestea_pet_350',
    name: 'NESTEA Lemon PET 350ml',
    category: 'PET Bottle',
    points: 3,
    barcode: '8999908502353',
    image: 'nestea_350.png'
  },
  {
    id: 'nestea_pet_450',
    name: 'NESTEA PET 450ml',
    category: 'PET Bottle',
    points: 4,
    barcode: '8999908502452',
    image: 'nestea_450.png'
  },
  // LE MINERALE Products (Nestle)
  {
    id: 'leminerale_330',
    name: 'LE MINERALE 330ml',
    category: 'PET Bottle',
    points: 2,
    barcode: '8999999502133',
    image: 'leminerale_330.png'
  },
  {
    id: 'leminerale_600',
    name: 'LE MINERALE 600ml',
    category: 'PET Bottle',
    points: 3,
    barcode: '8999999502607',
    image: 'leminerale_600.png'
  },
  {
    id: 'leminerale_1500',
    name: 'LE MINERALE 1500ml',
    category: 'PET Bottle',
    points: 5,
    barcode: '8999999502157',
    image: 'leminerale_1500.png'
  },
  // Additional Common Products
  {
    id: 'kitkat_wrapper',
    name: 'KITKAT Wrapper',
    category: 'Aluminum',
    points: 1,
    barcode: '8999908501011',
    image: 'kitkat.png'
  },
  // Test Products (untuk testing barcode scanner)
  {
    id: 'test_product_1',
    name: 'Test Product 1',
    category: 'PET Bottle',
    points: 5,
    barcode: '9556001174659',
    image: 'test_product.png'
  },
  {
    id: 'test_product_2',
    name: 'Test Product 2',
    category: 'PET Bottle',
    points: 3,
    barcode: '8992696525931',
    image: 'test_product.png'
  },
];

export const rewardsCatalog: RewardItem[] = [
  {
    id: 'p1',
    type: 'product',
    name: 'MILO 1kg Box',
    points: 20,
    stock: 100,
    image: 'milo_1kg.jpg',
    category: 'Beverages',
    description: 'MILO chocolate malt powder drink 1kg'
  },
  {
    id: 'p2',
    type: 'product',
    name: 'NESCAFE Classic Jar',
    points: 15,
    stock: 50,
    image: 'nescafe_jar.jpg',
    category: 'Beverages',
    description: 'NESCAFE Classic instant coffee 200g'
  },
  {
    id: 'p3',
    type: 'product',
    name: 'DANCOW 1kg',
    points: 40,
    stock: 30,
    image: 'dancow_1kg.jpg',
    category: 'Dairy',
    description: 'DANCOW instant fortified milk powder 1kg'
  },
  {
    id: 'p4',
    type: 'product',
    name: 'BEAR BRAND 189ml (6 pack)',
    points: 25,
    stock: 75,
    image: 'bearbrand_pack.jpg',
    category: 'Dairy',
    description: 'BEAR BRAND sterilized milk 189ml x 6'
  },
  {
    id: 'p5',
    type: 'product',
    name: 'KIT KAT Chocolate Bar',
    points: 8,
    stock: 200,
    image: 'kitkat.jpg',
    category: 'Snacks',
    description: 'KIT KAT crispy wafer chocolate bar'
  },
  {
    id: 'v1',
    type: 'voucher',
    name: 'Indomaret Rp50K',
    points: 50,
    stock: 500,
    image: 'indomaret_logo.png',
    category: 'Retail',
    description: 'Indomaret voucher worth Rp 50,000'
  },
  {
    id: 'v2',
    type: 'voucher',
    name: 'OVO Rp20K',
    points: 20,
    stock: 1000,
    image: 'ovo_logo.png',
    category: 'E-Wallet',
    description: 'OVO e-wallet balance Rp 20,000'
  },
  {
    id: 'v3',
    type: 'voucher',
    name: 'Telkomsel Rp25K',
    points: 25,
    stock: 500,
    image: 'telkomsel_logo.png',
    category: 'Mobile Credit',
    description: 'Telkomsel mobile credit Rp 25,000'
  },
  {
    id: 'v4',
    type: 'voucher',
    name: 'Movie Ticket',
    points: 30,
    stock: 200,
    image: 'cinema_ticket.png',
    category: 'Entertainment',
    description: 'Cinema XXI movie ticket'
  },
  {
    id: 'v5',
    type: 'voucher',
    name: 'GoPay Rp15K',
    points: 15,
    stock: 800,
    image: 'gopay_logo.png',
    category: 'E-Wallet',
    description: 'GoPay e-wallet balance Rp 15,000'
  },
];

export const generateSeedData = () => {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = 7 * oneDay;
  const oneMonth = 30 * oneDay;

  // Create demo customers
  const customers: User[] = [
    {
      id: uuidv4(),
      role: 'customer',
      name: 'Budi Santoso',
      email: 'budi@example.com',
      phone: '081234567890',
      address: 'Jl. Sudirman No. 123, Jakarta Pusat',
      password: 'password123',
      points: 45,
      qrCode: '',
      createdAt: now - oneMonth,
      avatar: '',
    },
    {
      id: uuidv4(),
      role: 'customer',
      name: 'Siti Rahayu',
      email: 'siti@example.com',
      phone: '082345678901',
      address: 'Jl. Gatot Subroto No. 456, Jakarta Selatan',
      password: 'password123',
      points: 78,
      qrCode: '',
      createdAt: now - oneMonth + oneWeek,
      avatar: '',
    },
    {
      id: uuidv4(),
      role: 'customer',
      name: 'Ahmad Hidayat',
      email: 'ahmad@example.com',
      phone: '083456789012',
      address: 'Jl. Thamrin No. 789, Jakarta Pusat',
      password: 'password123',
      points: 120,
      qrCode: '',
      createdAt: now - oneMonth + 2 * oneWeek,
      avatar: '',
    },
    {
      id: uuidv4(),
      role: 'customer',
      name: 'Dewi Lestari',
      email: 'dewi@example.com',
      phone: '084567890123',
      address: 'Jl. Kuningan No. 321, Jakarta Selatan',
      password: 'password123',
      points: 32,
      qrCode: '',
      createdAt: now - 3 * oneWeek,
      avatar: '',
    },
    {
      id: uuidv4(),
      role: 'customer',
      name: 'Rudi Hermawan',
      email: 'rudi@example.com',
      phone: '085678901234',
      address: 'Jl. Rasuna Said No. 654, Jakarta Selatan',
      password: 'password123',
      points: 95,
      qrCode: '',
      createdAt: now - 2 * oneWeek,
      avatar: '',
    },
    {
      id: uuidv4(),
      role: 'customer',
      name: 'Nina Karlina',
      email: 'nina@example.com',
      phone: '086789012345',
      address: 'Jl. Senopati No. 987, Jakarta Selatan',
      password: 'password123',
      points: 156,
      qrCode: '',
      createdAt: now - oneWeek,
      avatar: '',
    },
    {
      id: uuidv4(),
      role: 'customer',
      name: 'Andi Wijaya',
      email: 'andi@example.com',
      phone: '087890123456',
      address: 'Jl. Menteng No. 159, Jakarta Pusat',
      password: 'password123',
      points: 63,
      qrCode: '',
      createdAt: now - 5 * oneDay,
      avatar: '',
    },
    {
      id: uuidv4(),
      role: 'customer',
      name: 'Rina Susanti',
      email: 'rina@example.com',
      phone: '088901234567',
      address: 'Jl. Kemang No. 753, Jakarta Selatan',
      password: 'password123',
      points: 88,
      qrCode: '',
      createdAt: now - 3 * oneDay,
      avatar: '',
    },
    {
      id: uuidv4(),
      role: 'customer',
      name: 'Joko Susilo',
      email: 'joko@example.com',
      phone: '089012345678',
      address: 'Jl. Blok M No. 951, Jakarta Selatan',
      password: 'password123',
      points: 41,
      qrCode: '',
      createdAt: now - 2 * oneDay,
      avatar: '',
    },
    {
      id: uuidv4(),
      role: 'customer',
      name: 'Maya Sari',
      email: 'maya@example.com',
      phone: '081122334455',
      address: 'Jl. Cikini No. 357, Jakarta Pusat',
      password: 'password123',
      points: 27,
      qrCode: '',
      createdAt: now - oneDay,
      avatar: '',
    },
  ];

  // Add QR codes to customers
  customers.forEach(customer => {
    customer.qrCode = btoa(JSON.stringify({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
    }));
  });

  // Create demo mitra partners
  const mitras: User[] = [
    {
      id: uuidv4(),
      role: 'mitra',
      name: 'Toko Maju Jaya',
      email: 'majujaya@example.com',
      phone: '081111222333',
      address: 'Jl. Pasar Minggu No. 12, Jakarta Selatan',
      password: 'password123',
      commission: 45000,
      createdAt: now - oneMonth,
      avatar: '',
    },
    {
      id: uuidv4(),
      role: 'mitra',
      name: 'Warung Pak Haji',
      email: 'pakhaji@example.com',
      phone: '082222333444',
      address: 'Jl. Cempaka Putih No. 34, Jakarta Pusat',
      password: 'password123',
      commission: 67500,
      createdAt: now - oneMonth + oneWeek,
      avatar: '',
    },
    {
      id: uuidv4(),
      role: 'mitra',
      name: 'Gerobak Bu Sari',
      email: 'busari@example.com',
      phone: '083333444555',
      address: 'Jl. Tanah Abang No. 56, Jakarta Pusat',
      password: 'password123',
      commission: 32400,
      createdAt: now - 3 * oneWeek,
      avatar: '',
    },
    {
      id: uuidv4(),
      role: 'mitra',
      name: 'Kios Berkah',
      email: 'berkah@example.com',
      phone: '084444555666',
      address: 'Jl. Kebayoran Lama No. 78, Jakarta Selatan',
      password: 'password123',
      commission: 89100,
      createdAt: now - 2 * oneWeek,
      avatar: '',
    },
    {
      id: uuidv4(),
      role: 'mitra',
      name: 'Toko Sumber Rezeki',
      email: 'sumberrezeki@example.com',
      phone: '085555666777',
      address: 'Jl. Mangga Besar No. 90, Jakarta Barat',
      password: 'password123',
      commission: 54300,
      createdAt: now - oneWeek,
      avatar: '',
    },
  ];

  // Create demo transactions
  const transactions: Transaction[] = [];
  let transactionCount = 0;

  // Generate random transactions for the past month
  for (let i = 0; i < 50; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const mitra = mitras[Math.floor(Math.random() * mitras.length)];
    const packaging = packagingTypes[Math.floor(Math.random() * packagingTypes.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);

    transactions.push({
      id: uuidv4(),
      customerId: customer.id,
      customerName: customer.name,
      mitraId: mitra.id,
      mitraName: mitra.name,
      packagingType: packaging,
      pointsEarned: packaging.points,
      commission: 300,
      location: mitra.address,
      timestamp: now - (daysAgo * oneDay) - (hoursAgo * 60 * 60 * 1000),
      status: 'completed',
    });
    transactionCount++;
  }

  // Create demo redemptions
  const redemptions: Redemption[] = [
    {
      id: uuidv4(),
      customerId: customers[0].id,
      customerName: customers[0].name,
      items: [
        { rewardId: 'p1', rewardName: 'MILO 1kg Box', quantity: 1, points: 20 },
      ],
      totalPoints: 20,
      deliveryAddress: customers[0].address,
      status: 'delivered',
      timestamp: now - 10 * oneDay,
      trackingNumber: 'NLR' + Date.now().toString().slice(-8) + 'ABCD',
      redemptionMethod: 'delivery',
    },
    {
      id: uuidv4(),
      customerId: customers[1].id,
      customerName: customers[1].name,
      items: [
        { rewardId: 'v2', rewardName: 'OVO Rp20K', quantity: 2, points: 40 },
      ],
      totalPoints: 40,
      deliveryAddress: customers[1].address,
      status: 'shipped',
      timestamp: now - 3 * oneDay,
      trackingNumber: 'NLR' + Date.now().toString().slice(-8) + 'EFGH',
      redemptionMethod: 'vending',
      redemptionCode: 'RDM12345ABCD',
    },
    {
      id: uuidv4(),
      customerId: customers[2].id,
      customerName: customers[2].name,
      items: [
        { rewardId: 'p2', rewardName: 'NESCAFE Classic Jar', quantity: 1, points: 15 },
        { rewardId: 'p5', rewardName: 'KIT KAT Chocolate Bar', quantity: 2, points: 16 },
      ],
      totalPoints: 31,
      deliveryAddress: customers[2].address,
      status: 'processing',
      timestamp: now - oneDay,
      trackingNumber: 'NLR' + Date.now().toString().slice(-8) + 'IJKL',
      redemptionMethod: 'agent',
      redemptionCode: 'RDM67890EFGH',
    },
  ];

  return {
    users: [...customers, ...mitras],
    transactions,
    redemptions,
    rewardsCatalog,
    packagingTypes,
  };
};

export const initializeLocalStorage = () => {
  const existingUsers = localStorage.getItem('users');

  if (!existingUsers) {
    const seedData = generateSeedData();
    localStorage.setItem('users', JSON.stringify(seedData.users));
    localStorage.setItem('transactions', JSON.stringify(seedData.transactions));
    localStorage.setItem('redemptions', JSON.stringify(seedData.redemptions));
    localStorage.setItem('rewards_catalog', JSON.stringify(seedData.rewardsCatalog));
    localStorage.setItem('packaging_types', JSON.stringify(seedData.packagingTypes));
  }
};
