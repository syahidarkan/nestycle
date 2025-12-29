import React, { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { formatNumber } from '../../utils/formatting';
import RewardsMarketplace from '../../components/customer/RewardsMarketplace';
import RedemptionCart from '../../components/customer/RedemptionCart';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Redeem: React.FC = () => {
  const { user } = useAuth();
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const rewards = useMemo(() => {
    const catalogData = localStorage.getItem('rewards_catalog');
    return catalogData ? JSON.parse(catalogData) : [];
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards Marketplace</h1>
          <p className="text-gray-600">
            You have <span className="font-bold text-primary">{formatNumber(user.points || 0)} points</span> to spend
          </p>
        </div>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative px-6 py-3 bg-primary hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center space-x-2"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          <span>Cart</span>
          {cart.length > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {cart.length}
            </div>
          )}
        </button>
      </div>

      {/* Marketplace */}
      <RewardsMarketplace rewards={rewards} userPoints={user.points || 0} />

      {/* Cart Sidebar */}
      <RedemptionCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Redeem;
