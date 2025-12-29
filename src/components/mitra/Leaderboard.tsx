import React, { useMemo } from 'react';
import type { Transaction, User, LeaderboardEntry } from '../../types';
import { formatNumber, formatCurrency } from '../../utils/formatting';
import { TrophyIcon, StarIcon } from '@heroicons/react/24/solid';

interface LeaderboardProps {
  currentUserId: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ currentUserId }) => {
  const leaderboard = useMemo(() => {
    const usersData = localStorage.getItem('users');
    const transactionsData = localStorage.getItem('transactions');

    if (!usersData || !transactionsData) return [];

    const users: User[] = JSON.parse(usersData);
    const transactions: Transaction[] = JSON.parse(transactionsData);

    const mitras = users.filter(u => u.role === 'mitra');

    const entries: LeaderboardEntry[] = mitras.map(mitra => {
      const mitraTransactions = transactions.filter(t => t.mitraId === mitra.id);
      return {
        mitraId: mitra.id,
        mitraName: mitra.name,
        bottlesCollected: mitraTransactions.length,
        totalCommission: mitra.commission || 0,
        rank: 0,
      };
    });

    // Sort by bottles collected
    entries.sort((a, b) => b.bottlesCollected - a.bottlesCollected);

    // Assign ranks
    entries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return entries;
  }, []);

  const currentUserRank = leaderboard.find(e => e.mitraId === currentUserId);

  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-600';
    return 'text-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* Current User Rank */}
      {currentUserRank && (
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Your Rank</p>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-5xl font-bold">#{currentUserRank.rank}</h2>
                <span className="text-purple-200 text-lg">of {leaderboard.length}</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <TrophyIcon className="w-12 h-12" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-purple-200 text-xs mb-1">Bottles Collected</p>
              <p className="text-2xl font-bold">{formatNumber(currentUserRank.bottlesCollected)}</p>
            </div>
            <div>
              <p className="text-purple-200 text-xs mb-1">Total Earnings</p>
              <p className="text-2xl font-bold">{formatCurrency(currentUserRank.totalCommission)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <StarIcon className="w-6 h-6" />
            <span>Top Performers</span>
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {leaderboard.slice(0, 10).map((entry) => {
            const isCurrentUser = entry.mitraId === currentUserId;

            return (
              <div
                key={entry.mitraId}
                className={`p-4 transition-colors ${
                  isCurrentUser ? 'bg-blue-50 border-l-4 border-primary' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 text-center">
                    {entry.rank <= 3 ? (
                      <TrophyIcon className={`w-8 h-8 mx-auto ${getMedalColor(entry.rank)}`} />
                    ) : (
                      <span className="text-2xl font-bold text-gray-400">#{entry.rank}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className={`font-semibold ${isCurrentUser ? 'text-primary' : 'text-gray-900'}`}>
                        {entry.mitraName}
                      </p>
                      {isCurrentUser && (
                        <span className="px-2 py-0.5 bg-primary text-white text-xs font-semibold rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-gray-600">
                        {formatNumber(entry.bottlesCollected)} bottles
                      </p>
                      <p className="text-sm font-semibold text-green-600">
                        {formatCurrency(entry.totalCommission)}
                      </p>
                    </div>
                  </div>

                  {/* Badge for top 3 */}
                  {entry.rank <= 3 && (
                    <div className={`flex-shrink-0 ${
                      entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                      entry.rank === 2 ? 'bg-gray-100 text-gray-800' :
                      'bg-orange-100 text-orange-800'
                    } px-3 py-1 rounded-full`}>
                      <p className="text-xs font-bold">
                        {entry.rank === 1 ? 'GOLD' : entry.rank === 2 ? 'SILVER' : 'BRONZE'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivation Message */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 text-center">
        <TrophyIcon className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
        <h4 className="font-semibold text-gray-900 mb-2">Keep Collecting!</h4>
        <p className="text-sm text-gray-600">
          The more bottles you collect, the higher you'll climb on the leaderboard.
          Compete with other partners and earn more rewards!
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
