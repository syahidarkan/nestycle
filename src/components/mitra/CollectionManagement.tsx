import React, { useMemo, useState } from 'react';
import type { Transaction } from '../../types';
import { formatDateTime, formatNumber } from '../../utils/formatting';
import { FunnelIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface CollectionManagementProps {
  transactions: Transaction[];
}

const CollectionManagement: React.FC<CollectionManagementProps> = ({ transactions }) => {
  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'month' | 'all'>('all');

  const filteredTransactions = useMemo(() => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    return transactions.filter(t => {
      if (filterPeriod === 'today') return now - t.timestamp < oneDay;
      if (filterPeriod === 'week') return now - t.timestamp < 7 * oneDay;
      if (filterPeriod === 'month') return now - t.timestamp < 30 * oneDay;
      return true;
    });
  }, [transactions, filterPeriod]);

  const stats = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, t) => ({
        bottles: acc.bottles + 1,
        points: acc.points + t.pointsEarned,
        commission: acc.commission + t.commission,
      }),
      { bottles: 0, points: 0, commission: 0 }
    );
  }, [filteredTransactions]);

  // Group by packaging type
  const packagingStats = useMemo(() => {
    const stats = new Map<string, { count: number; points: number }>();

    filteredTransactions.forEach(t => {
      const key = t.packagingType.name;
      const current = stats.get(key) || { count: 0, points: 0 };
      stats.set(key, {
        count: current.count + 1,
        points: current.points + t.pointsEarned,
      });
    });

    return Array.from(stats.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count);
  }, [filteredTransactions]);

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center space-x-3">
          <FunnelIcon className="w-5 h-5 text-gray-500" />
          <div className="flex space-x-2 flex-1 overflow-x-auto">
            {[
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'This Week' },
              { value: 'month', label: 'This Month' },
              { value: 'all', label: 'All Time' },
            ].map(period => (
              <button
                key={period.value}
                onClick={() => setFilterPeriod(period.value as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filterPeriod === period.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Bottles</p>
          <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.bottles)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Points Issued</p>
          <p className="text-2xl font-bold text-primary">{formatNumber(stats.points)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-1">Commission</p>
          <p className="text-2xl font-bold text-green-600">{formatNumber(stats.commission)}</p>
        </div>
      </div>

      {/* Packaging Breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection by Type</h3>
        {packagingStats.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No collections yet</p>
        ) : (
          <div className="space-y-3">
            {packagingStats.map(stat => (
              <div key={stat.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{stat.name}</p>
                  <p className="text-sm text-gray-500">{stat.count} bottles</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{formatNumber(stat.points)} pts</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Collections */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Collections</h3>
        {filteredTransactions.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No transactions found</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredTransactions.slice(0, 20).map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{transaction.packagingType.name}</p>
                  <p className="text-sm text-gray-600">{transaction.customerName}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-500">{formatDateTime(transaction.timestamp)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{formatNumber(transaction.pointsEarned)} pts</p>
                  <p className="text-xs text-green-600">+Rp {transaction.commission}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionManagement;
