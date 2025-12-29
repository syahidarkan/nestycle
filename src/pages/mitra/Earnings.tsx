import React, { useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePoints } from '../../contexts/PointsContext';
import EarningsTracker from '../../components/mitra/EarningsTracker';

const Earnings: React.FC = () => {
  const { user } = useAuth();
  const { getUserTransactions } = usePoints();

  const transactions = useMemo(() => {
    if (!user) return [];
    return getUserTransactions(user.id);
  }, [user, getUserTransactions]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings Report</h1>
        <p className="text-gray-600">Track your commission and payout schedule</p>
      </div>
      <EarningsTracker transactions={transactions} totalCommission={user?.commission || 0} />
    </div>
  );
};

export default Earnings;
