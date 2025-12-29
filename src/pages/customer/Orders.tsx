import React, { useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePoints } from '../../contexts/PointsContext';
import OrderTracking from '../../components/customer/OrderTracking';
import EmptyState from '../../components/shared/EmptyState';
import { GiftIcon } from '@heroicons/react/24/outline';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { getUserRedemptions } = usePoints();

  const redemptions = useMemo(() => {
    if (!user) return [];
    return getUserRedemptions(user.id);
  }, [user, getUserRedemptions]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track your redemption orders</p>
      </div>

      {redemptions.length === 0 ? (
        <EmptyState
          icon={GiftIcon}
          title="No orders yet"
          description="You haven't redeemed any rewards yet. Browse the marketplace to get started!"
          actionLabel="Browse Rewards"
          actionLink="/customer/redeem"
        />
      ) : (
        <div className="space-y-6">
          {redemptions.map(redemption => (
            <OrderTracking key={redemption.id} redemption={redemption} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
