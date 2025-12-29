import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Transaction, Redemption, PointsContextType, RedemptionStatus, User } from '../types';
import { generateTrackingNumber } from '../utils/formatting';

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};

interface PointsProviderProps {
  children: ReactNode;
}

export const PointsProvider: React.FC<PointsProviderProps> = ({ children }) => {
  const updatePoints = (userId: string, points: number) => {
    const usersData = localStorage.getItem('users');
    if (!usersData) return;

    const users: User[] = JSON.parse(usersData);
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex !== -1 && users[userIndex].role === 'customer') {
      users[userIndex].points = (users[userIndex].points || 0) + points;
      localStorage.setItem('users', JSON.stringify(users));

      // Update current user if it's the same user
      const currentUserData = localStorage.getItem('current_user');
      if (currentUserData) {
        const currentUser: User = JSON.parse(currentUserData);
        if (currentUser.id === userId) {
          currentUser.points = users[userIndex].points;
          localStorage.setItem('current_user', JSON.stringify(currentUser));
        }
      }
    }
  };

  const getUserTransactions = (userId: string): Transaction[] => {
    const transactionsData = localStorage.getItem('transactions');
    if (!transactionsData) return [];

    const transactions: Transaction[] = JSON.parse(transactionsData);
    return transactions
      .filter((t) => t.customerId === userId || t.mitraId === userId)
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  const getUserRedemptions = (userId: string): Redemption[] => {
    const redemptionsData = localStorage.getItem('redemptions');
    if (!redemptionsData) return [];

    const redemptions: Redemption[] = JSON.parse(redemptionsData);
    return redemptions
      .filter((r) => r.customerId === userId)
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  const createTransaction = (
    transaction: Omit<Transaction, 'id' | 'timestamp'>
  ) => {
    const transactionsData = localStorage.getItem('transactions');
    const transactions: Transaction[] = transactionsData
      ? JSON.parse(transactionsData)
      : [];

    const newTransaction: Transaction = {
      ...transaction,
      id: uuidv4(),
      timestamp: Date.now(),
    };

    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Update customer points
    updatePoints(transaction.customerId, transaction.pointsEarned);

    // Update mitra commission
    const usersData = localStorage.getItem('users');
    if (usersData) {
      const users: User[] = JSON.parse(usersData);
      const mitraIndex = users.findIndex((u) => u.id === transaction.mitraId);
      if (mitraIndex !== -1 && users[mitraIndex].role === 'mitra') {
        users[mitraIndex].commission =
          (users[mitraIndex].commission || 0) + transaction.commission;
        localStorage.setItem('users', JSON.stringify(users));

        // Update current user if it's the mitra
        const currentUserData = localStorage.getItem('current_user');
        if (currentUserData) {
          const currentUser: User = JSON.parse(currentUserData);
          if (currentUser.id === transaction.mitraId) {
            currentUser.commission = users[mitraIndex].commission;
            localStorage.setItem('current_user', JSON.stringify(currentUser));
          }
        }
      }
    }
  };

  const createRedemption = (
    redemption: Omit<Redemption, 'id' | 'timestamp' | 'trackingNumber' | 'status'>
  ) => {
    const redemptionsData = localStorage.getItem('redemptions');
    const redemptions: Redemption[] = redemptionsData
      ? JSON.parse(redemptionsData)
      : [];

    const newRedemption: Redemption = {
      ...redemption,
      id: uuidv4(),
      timestamp: Date.now(),
      trackingNumber: generateTrackingNumber(),
      status: 'pending',
    };

    redemptions.push(newRedemption);
    localStorage.setItem('redemptions', JSON.stringify(redemptions));

    // Deduct points from customer
    updatePoints(redemption.customerId, -redemption.totalPoints);

    // Update stock for redeemed items
    const catalogData = localStorage.getItem('rewards_catalog');
    if (catalogData) {
      const catalog = JSON.parse(catalogData);
      redemption.items.forEach((item) => {
        const rewardIndex = catalog.findIndex((r: any) => r.id === item.rewardId);
        if (rewardIndex !== -1) {
          catalog[rewardIndex].stock -= item.quantity;
        }
      });
      localStorage.setItem('rewards_catalog', JSON.stringify(catalog));
    }
  };

  const getAllTransactions = (): Transaction[] => {
    const transactionsData = localStorage.getItem('transactions');
    if (!transactionsData) return [];

    const transactions: Transaction[] = JSON.parse(transactionsData);
    return transactions.sort((a, b) => b.timestamp - a.timestamp);
  };

  const updateRedemptionStatus = (
    redemptionId: string,
    status: RedemptionStatus
  ) => {
    const redemptionsData = localStorage.getItem('redemptions');
    if (!redemptionsData) return;

    const redemptions: Redemption[] = JSON.parse(redemptionsData);
    const redemptionIndex = redemptions.findIndex((r) => r.id === redemptionId);

    if (redemptionIndex !== -1) {
      redemptions[redemptionIndex].status = status;
      localStorage.setItem('redemptions', JSON.stringify(redemptions));
    }
  };

  const value: PointsContextType = {
    updatePoints,
    getUserTransactions,
    getUserRedemptions,
    createTransaction,
    createRedemption,
    getAllTransactions,
    updateRedemptionStatus,
  };

  return (
    <PointsContext.Provider value={value}>{children}</PointsContext.Provider>
  );
};
