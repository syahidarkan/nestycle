import React, { useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePoints } from '../../contexts/PointsContext';
import { formatDateTime, formatNumber } from '../../utils/formatting';
import { ClockIcon, FunnelIcon } from '@heroicons/react/24/outline';
import EmptyState from '../../components/shared/EmptyState';

const History: React.FC = () => {
  const { user } = useAuth();
  const { getUserTransactions } = usePoints();
  const [filter, setFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const transactions = useMemo(() => {
    if (!user) return [];
    const allTransactions = getUserTransactions(user.id);

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (filter === 'today') return allTransactions.filter(t => now - t.timestamp < oneDay);
    if (filter === 'week') return allTransactions.filter(t => now - t.timestamp < 7 * oneDay);
    if (filter === 'month') return allTransactions.filter(t => now - t.timestamp < 30 * oneDay);
    return allTransactions;
  }, [user, getUserTransactions, filter]);

  const totalPoints = useMemo(() => {
    return transactions.reduce((sum, t) => sum + t.pointsEarned, 0);
  }, [transactions]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center space-x-3">
          <FunnelIcon className="w-5 h-5 text-gray-500" />
          <div className="flex space-x-2">
            {[
              { value: 'all', label: 'All Time' },
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'This Week' },
              { value: 'month', label: 'This Month' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === opt.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
            <p className="text-3xl font-bold text-gray-900">{formatNumber(transactions.length)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Points Earned</p>
            <p className="text-3xl font-bold text-primary">{formatNumber(totalPoints)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Current Balance</p>
            <p className="text-3xl font-bold text-green-600">{formatNumber(user.points || 0)}</p>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {transactions.length === 0 ? (
          <EmptyState
            icon={ClockIcon}
            title="No transactions found"
            description="You don't have any transactions in this period"
          />
        ) : (
          <div className="divide-y divide-gray-200">
            {transactions.map(transaction => (
              <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{transaction.packagingType.name}</h3>
                    <p className="text-sm text-gray-600">{transaction.packagingType.category}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-500">Partner: {transaction.mitraName}</p>
                      <p className="text-sm text-gray-500">Location: {transaction.location}</p>
                      <p className="text-xs text-gray-400">{formatDateTime(transaction.timestamp)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-baseline space-x-1 mb-2">
                      <span className="text-2xl font-bold text-primary">+{formatNumber(transaction.pointsEarned)}</span>
                      <span className="text-sm text-gray-500">pts</span>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold capitalize">
                      {transaction.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
