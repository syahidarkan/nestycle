import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePoints } from '../../contexts/PointsContext';
import { formatDateTime, formatNumber } from '../../utils/formatting';
import { ENVIRONMENTAL_IMPACT } from '../../utils/constants';
import PointsCard from '../../components/customer/PointsCard';
import QRCodeDisplay from '../../components/customer/QRCodeDisplay';
import StatsCard from '../../components/shared/StatsCard';
import {
  GiftIcon,
  ClockIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  SparklesIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getUserTransactions, getUserRedemptions } = usePoints();

  const transactions = useMemo(() => {
    if (!user) return [];
    return getUserTransactions(user.id);
  }, [user, getUserTransactions]);

  const redemptions = useMemo(() => {
    if (!user) return [];
    return getUserRedemptions(user.id);
  }, [user, getUserRedemptions]);

  const stats = useMemo(() => {
    const bottlesCollected = transactions.length;
    const co2Saved = bottlesCollected * ENVIRONMENTAL_IMPACT.CO2_PER_BOTTLE;
    const treesEquivalent = bottlesCollected / ENVIRONMENTAL_IMPACT.TREES_EQUIVALENT;

    return {
      bottlesCollected,
      co2Saved: co2Saved.toFixed(2),
      treesEquivalent: treesEquivalent.toFixed(1),
      totalRedemptions: redemptions.length,
    };
  }, [transactions, redemptions]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-1">
          Halo, {user.name}!
        </h1>
        <p className="text-sm text-neutral-600">Lihat ringkasan kontribusi lingkungan Anda</p>
      </div>

      {/* Points and QR Section */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <PointsCard points={user.points || 0} />
        </div>
        <div className="lg:col-span-1">
          <QRCodeDisplay qrCode={user.qrCode || ''} userName={user.name} size={200} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatsCard
          title="Kemasan Terkumpul"
          value={formatNumber(stats.bottlesCollected)}
          icon={SparklesIcon}
          color="blue"
        />
        <StatsCard
          title="CO2 Terselamatkan"
          value={`${stats.co2Saved} kg`}
          icon={GlobeAltIcon}
          color="green"
        />
        <StatsCard
          title="Setara Pohon"
          value={stats.treesEquivalent}
          icon={GlobeAltIcon}
          color="emerald"
        />
        <StatsCard
          title="Total Penukaran"
          value={formatNumber(stats.totalRedemptions)}
          icon={GiftIcon}
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          to="/customer/redeem"
          className="bg-white border border-neutral-200 rounded-lg p-5 hover:shadow-card transition-shadow group"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
            <GiftIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-base font-semibold text-neutral-900 mb-1">Tukar Poin</h3>
          <p className="text-neutral-600 text-sm mb-3">
            Tukar poin Anda dengan produk dan voucher menarik
          </p>
          <div className="flex items-center space-x-2 text-sm font-semibold text-primary">
            <span>Belanja Sekarang</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/customer/history"
          className="bg-white border border-neutral-200 rounded-lg p-5 hover:shadow-card transition-shadow group"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
            <ClockIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-base font-semibold text-neutral-900 mb-1">Lihat Riwayat</h3>
          <p className="text-neutral-600 text-sm mb-3">
            Lacak semua pengumpulan dan transaksi Anda
          </p>
          <div className="flex items-center space-x-2 text-sm font-semibold text-primary">
            <span>Lihat Detail</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/customer/orders"
          className="bg-white border border-neutral-200 rounded-lg p-5 hover:shadow-card transition-shadow group"
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-3">
            <ShoppingBagIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-base font-semibold text-neutral-900 mb-1">Lacak Pesanan</h3>
          <p className="text-neutral-600 text-sm mb-3">
            Pantau status pesanan penukaran Anda
          </p>
          <div className="flex items-center space-x-2 text-sm font-semibold text-primary">
            <span>Cek Status</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent Collections */}
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-neutral-900">Pengumpulan Terbaru</h3>
            <Link to="/customer/history" className="text-sm text-primary hover:text-primary-600 font-medium">
              Lihat Semua
            </Link>
          </div>
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-neutral-400">
              <SparklesIcon className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Belum ada pengumpulan</p>
              <p className="text-xs mt-1">Mulai kumpulkan untuk mendapat poin!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900 text-sm">{transaction.packagingType.name}</p>
                    <p className="text-xs text-neutral-600">{transaction.mitraName}</p>
                    <p className="text-xs text-neutral-400">{formatDateTime(transaction.timestamp)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary text-sm">+{formatNumber(transaction.pointsEarned)} pts</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Redemptions */}
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-neutral-900">Penukaran Terbaru</h3>
            <Link to="/customer/orders" className="text-sm text-primary hover:text-primary-600 font-medium">
              Lihat Semua
            </Link>
          </div>
          {redemptions.length === 0 ? (
            <div className="text-center py-8 text-neutral-400">
              <GiftIcon className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">Belum ada penukaran</p>
              <p className="text-xs mt-1">
                <Link to="/customer/redeem" className="text-primary hover:underline">
                  Jelajahi hadiah
                </Link>{' '}
                untuk tukar poin Anda
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {redemptions.slice(0, 5).map((redemption) => (
                <div
                  key={redemption.id}
                  className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900 text-sm">
                      {redemption.items.length} item
                    </p>
                    <p className="text-xs text-neutral-600 capitalize">{redemption.status}</p>
                    <p className="text-xs text-neutral-400">{formatDateTime(redemption.timestamp)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-secondary text-sm">
                      {formatNumber(redemption.totalPoints)} pts
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-success-50 border border-success-200 rounded-lg p-5">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
            <GlobeAltIcon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900">Dampak Lingkungan Anda</h3>
        </div>
        <p className="text-neutral-700 text-sm mb-4">
          Dengan mengumpulkan {formatNumber(stats.bottlesCollected)} kemasan, Anda telah menyelamatkan{' '}
          <span className="font-bold text-success">{stats.co2Saved} kg CO2</span> dari atmosfer.
          Ini setara dengan menanam{' '}
          <span className="font-bold text-success">{stats.treesEquivalent} pohon</span>!
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white rounded-lg p-3 text-center border border-neutral-200">
            <p className="text-xl font-bold text-neutral-900">{formatNumber(stats.bottlesCollected)}</p>
            <p className="text-xs text-neutral-600 mt-1">Kemasan Didaur Ulang</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center border border-neutral-200">
            <p className="text-xl font-bold text-success">{stats.co2Saved} kg</p>
            <p className="text-xs text-neutral-600 mt-1">CO2 Terselamatkan</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center border border-neutral-200">
            <p className="text-xl font-bold text-primary">{stats.treesEquivalent}</p>
            <p className="text-xs text-neutral-600 mt-1">Setara Pohon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
