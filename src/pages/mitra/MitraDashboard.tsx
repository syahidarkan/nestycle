import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePoints } from '../../contexts/PointsContext';
import { formatCurrency, formatNumber } from '../../utils/formatting';
import StatsCard from '../../components/shared/StatsCard';
import Leaderboard from '../../components/mitra/Leaderboard';
import {
  BanknotesIcon,
  QrCodeIcon,
  CubeIcon,
  ArrowRightIcon,
  SparklesIcon,
  TrophyIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const MitraDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getUserTransactions } = usePoints();

  const transactions = useMemo(() => {
    if (!user) return [];
    return getUserTransactions(user.id);
  }, [user, getUserTransactions]);

  const stats = useMemo(() => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    const today = transactions.filter(t => now - t.timestamp < oneDay);
    const thisWeek = transactions.filter(t => now - t.timestamp < 7 * oneDay);

    return {
      today: {
        bottles: today.length,
        points: today.reduce((sum, t) => sum + t.pointsEarned, 0),
        commission: today.reduce((sum, t) => sum + t.commission, 0),
      },
      week: {
        bottles: thisWeek.length,
        points: thisWeek.reduce((sum, t) => sum + t.pointsEarned, 0),
        commission: thisWeek.reduce((sum, t) => sum + t.commission, 0),
      },
      total: {
        bottles: transactions.length,
        commission: user?.commission || 0,
      },
    };
  }, [transactions, user]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-1">Halo, {user.name}!</h1>
        <p className="text-sm text-neutral-600">Ringkasan pengumpulan dan pendapatan Anda</p>
      </div>

      {/* Earnings Card */}
      <div className="bg-primary rounded-lg p-6 text-white shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 text-sm font-medium mb-1">Total Pendapatan</p>
            <h2 className="text-4xl font-bold mb-2">{formatCurrency(stats.total.commission)}</h2>
            <p className="text-primary-100 text-sm">Dari {formatNumber(stats.total.bottles)} kemasan terkumpul</p>
          </div>
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <BanknotesIcon className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatsCard title="Kemasan Hari Ini" value={formatNumber(stats.today.bottles)} icon={CubeIcon} color="blue" />
        <StatsCard title="Komisi Hari Ini" value={formatCurrency(stats.today.commission)} icon={BanknotesIcon} color="green" />
        <StatsCard title="Kemasan Minggu Ini" value={formatNumber(stats.week.bottles)} icon={SparklesIcon} color="purple" />
        <StatsCard title="Komisi Minggu Ini" value={formatCurrency(stats.week.commission)} icon={BanknotesIcon} color="emerald" />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          to="/mitra/scan"
          className="bg-white border border-neutral-200 rounded-lg p-5 hover:shadow-card transition-shadow group"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
            <QrCodeIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-base font-semibold text-neutral-900 mb-1">Mulai Scan</h3>
          <p className="text-neutral-600 text-sm mb-3">Scan QR customer & barcode kemasan</p>
          <div className="flex items-center space-x-2 text-sm font-semibold text-primary">
            <span>Buka Scanner</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/mitra/collections"
          className="bg-white border border-neutral-200 rounded-lg p-5 hover:shadow-card transition-shadow group"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
            <CubeIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-base font-semibold text-neutral-900 mb-1">Lihat Koleksi</h3>
          <p className="text-neutral-600 text-sm mb-3">Lacak semua kemasan yang terkumpul</p>
          <div className="flex items-center space-x-2 text-sm font-semibold text-primary">
            <span>Lihat Detail</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/mitra/earnings"
          className="bg-white border border-neutral-200 rounded-lg p-5 hover:shadow-card transition-shadow group"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-base font-semibold text-neutral-900 mb-1">Lihat Pendapatan</h3>
          <p className="text-neutral-600 text-sm mb-3">Lacak komisi dan pencairan dana Anda</p>
          <div className="flex items-center space-x-2 text-sm font-semibold text-primary">
            <span>Lihat Laporan</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Leaderboard */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-warning rounded-lg flex items-center justify-center">
            <TrophyIcon className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-neutral-900">Leaderboard Mitra</h2>
        </div>
        <Leaderboard currentUserId={user.id} />
      </div>
    </div>
  );
};

export default MitraDashboard;
