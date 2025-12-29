import React, { useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePoints } from '../../contexts/PointsContext';
import CollectionManagement from '../../components/mitra/CollectionManagement';

const Collections: React.FC = () => {
  const { user } = useAuth();
  const { getUserTransactions } = usePoints();

  const transactions = useMemo(() => {
    if (!user) return [];
    return getUserTransactions(user.id);
  }, [user, getUserTransactions]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Collection Management</h1>
        <p className="text-gray-600">Track and manage all your bottle collections</p>
      </div>
      <CollectionManagement transactions={transactions} />
    </div>
  );
};

export default Collections;
