import React, { useState, useMemo } from 'react';
import type { RewardItem } from '../../types';
import { formatNumber } from '../../utils/formatting';
import { useCart } from '../../contexts/CartContext';
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  CheckIcon,
  GiftIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';

interface RewardsMarketplaceProps {
  rewards: RewardItem[];
  userPoints: number;
}

const RewardsMarketplace: React.FC<RewardsMarketplaceProps> = ({ rewards, userPoints }) => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(rewards.map(r => r.category));
    return ['all', ...Array.from(cats)];
  }, [rewards]);

  // Filter rewards
  const filteredRewards = useMemo(() => {
    return rewards.filter(reward => {
      const matchesSearch = reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           reward.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || reward.category === selectedCategory;
      const matchesType = selectedType === 'all' || reward.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [rewards, searchQuery, selectedCategory, selectedType]);

  const handleAddToCart = (reward: RewardItem) => {
    addToCart(reward, 1);
    setAddedItems(prev => new Set(prev).add(reward.id));

    // Remove the checkmark after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(reward.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>

          {/* Type Filter */}
          <div className="flex space-x-2">
            {['all', 'product', 'voucher'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'All' : type === 'product' ? 'Products' : 'Vouchers'}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredRewards.length}</span> rewards
        </p>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600">Your balance:</span>
          <span className="font-bold text-primary">{formatNumber(userPoints)} pts</span>
        </div>
      </div>

      {/* Rewards Grid */}
      {filteredRewards.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No rewards found</h3>
          <p className="text-gray-600">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map(reward => {
            const canAfford = userPoints >= reward.points;
            const isAdded = addedItems.has(reward.id);
            const outOfStock = reward.stock === 0;

            return (
              <div
                key={reward.id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow ${
                  outOfStock ? 'opacity-60' : ''
                }`}
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {reward.type === 'product' ? (
                      <GiftIcon className="w-20 h-20 text-gray-400" />
                    ) : (
                      <TicketIcon className="w-20 h-20 text-gray-400" />
                    )}
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      reward.type === 'product'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {reward.type === 'product' ? 'Product' : 'Voucher'}
                    </span>
                  </div>

                  {/* Stock Badge */}
                  {outOfStock && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  {!outOfStock && reward.stock < 10 && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                        Only {reward.stock} left
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {reward.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{reward.category}</p>
                  {reward.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {reward.description}
                    </p>
                  )}

                  {/* Points and Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-2xl font-bold text-primary">
                          {formatNumber(reward.points)}
                        </span>
                        <span className="text-sm text-gray-500">pts</span>
                      </div>
                      {!canAfford && !outOfStock && (
                        <p className="text-xs text-red-600 mt-1">
                          Need {formatNumber(reward.points - userPoints)} more
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(reward)}
                      disabled={!canAfford || outOfStock || isAdded}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        isAdded
                          ? 'bg-green-600 text-white'
                          : canAfford && !outOfStock
                          ? 'bg-primary hover:bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckIcon className="w-5 h-5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCartIcon className="w-5 h-5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RewardsMarketplace;
