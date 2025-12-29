import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatNumber } from '../../utils/formatting';
import {
  XMarkIcon,
  ShoppingCartIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface RedemptionCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const RedemptionCart: React.FC<RedemptionCartProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPoints } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalPoints = getTotalPoints();
  const canRedeem = user && user.points !== undefined && user.points >= totalPoints;

  const handleCheckout = () => {
    if (!user || !canRedeem) return;

    // Close cart
    onClose();

    // Navigate to checkout page
    navigate('/customer/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ShoppingCartIcon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">
              Cart ({cart.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <ShoppingCartIcon className="w-20 h-20 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Add rewards from the marketplace to get started
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
              >
                Browse Rewards
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div
                  key={item.reward.id}
                  className="bg-gray-50 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.reward.name}
                      </h3>
                      <p className="text-xs text-gray-500">{item.reward.category}</p>
                      <div className="mt-2">
                        <span className="text-lg font-bold text-primary">
                          {formatNumber(item.reward.points * item.quantity)}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">pts</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.reward.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quantity</span>
                    <div className="flex items-center space-x-3 bg-white rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.reward.id, item.quantity - 1)}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.reward.id, item.quantity + 1)}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                        disabled={item.quantity >= item.reward.stock}
                      >
                        <PlusIcon className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Stock warning */}
                  {item.quantity >= item.reward.stock && (
                    <p className="text-xs text-orange-600">
                      Maximum quantity reached
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Items</span>
                <span className="font-medium text-gray-900">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total Points</span>
                <div>
                  <span className="text-primary">{formatNumber(totalPoints)}</span>
                  <span className="text-sm text-gray-500 ml-1">pts</span>
                </div>
              </div>

              {/* Balance Check */}
              {user && user.points !== undefined && (
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Your Balance</span>
                    <span className="font-medium text-gray-900">
                      {formatNumber(user.points)} pts
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Remaining</span>
                    <span className={`font-medium ${
                      user.points >= totalPoints ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatNumber(user.points - totalPoints)} pts
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              {!canRedeem && (
                <p className="text-sm text-red-600 text-center">
                  Insufficient points for this redemption
                </p>
              )}

              <button
                onClick={handleCheckout}
                disabled={!canRedeem}
                className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => clearCart()}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RedemptionCart;
