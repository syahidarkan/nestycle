import React, { useMemo } from 'react';
import type { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatting';
import { BanknotesIcon, ArrowTrendingUpIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface EarningsTrackerProps {
  transactions: Transaction[];
  totalCommission: number;
}

const EarningsTracker: React.FC<EarningsTrackerProps> = ({ transactions, totalCommission }) => {
  const earnings = useMemo(() => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    const today = transactions.filter(t => now - t.timestamp < oneDay);
    const thisWeek = transactions.filter(t => now - t.timestamp < 7 * oneDay);
    const thisMonth = transactions.filter(t => now - t.timestamp < 30 * oneDay);

    return {
      today: today.reduce((sum, t) => sum + t.commission, 0),
      week: thisWeek.reduce((sum, t) => sum + t.commission, 0),
      month: thisMonth.reduce((sum, t) => sum + t.commission, 0),
      all: totalCommission,
    };
  }, [transactions, totalCommission]);

  // Group by date for chart data
  const dailyEarnings = useMemo(() => {
    const last7Days = new Map<string, number>();
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateKey = formatDate(date.getTime());
      last7Days.set(dateKey, 0);
    }

    transactions.forEach(t => {
      const dateKey = formatDate(t.timestamp);
      if (last7Days.has(dateKey)) {
        last7Days.set(dateKey, (last7Days.get(dateKey) || 0) + t.commission);
      }
    });

    return Array.from(last7Days.entries()).map(([date, amount]) => ({ date, amount }));
  }, [transactions]);

  const maxEarning = Math.max(...dailyEarnings.map(d => d.amount), 1);

  return (
    <div className="space-y-6">
      {/* Total Earnings Card */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <BanknotesIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-green-100 text-sm font-medium">Total Earnings</p>
            <h2 className="text-4xl font-bold">{formatCurrency(earnings.all)}</h2>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-4 text-green-100">
          <ArrowTrendingUpIcon className="w-5 h-5" />
          <span className="text-sm">Keep collecting to increase your earnings!</span>
        </div>
      </div>

      {/* Period Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-2">Today</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(earnings.today)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-2">This Week</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(earnings.week)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600 mb-2">This Month</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(earnings.month)}</p>
        </div>
      </div>

      {/* 7-Day Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Last 7 Days</h3>
        <div className="space-y-3">
          {dailyEarnings.map((day, index) => (
            <div key={index}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">{day.date}</span>
                <span className="font-semibold text-gray-900">{formatCurrency(day.amount)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 rounded-full h-2 transition-all duration-300"
                  style={{ width: `${(day.amount / maxEarning) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payout Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Payout Information</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
            <p>Payouts are processed monthly on the 1st of each month</p>
          </div>
          <div className="flex items-center space-x-2">
            <BanknotesIcon className="w-4 h-4 text-blue-600" />
            <p>Minimum payout amount: Rp 50,000</p>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="font-semibold text-gray-900">
              Next payout: <span className="text-primary">{formatCurrency(earnings.month)}</span>
            </p>
            <p className="text-xs text-gray-600 mt-1">Expected on 1st of next month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsTracker;
