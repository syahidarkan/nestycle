import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { usePoints } from '../../contexts/PointsContext';
import type { RedemptionMethod } from '../../types';
import { formatNumber } from '../../utils/formatting';
import {
  BuildingStorefrontIcon,
  TruckIcon,
  QrCodeIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart, getTotalPoints } = useCart();
  const { user, refreshUser } = useAuth();
  const { createRedemption } = usePoints();

  const [selectedMethod, setSelectedMethod] = useState<RedemptionMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [redemptionCode, setRedemptionCode] = useState('');

  const totalPoints = getTotalPoints();

  // Redirect if cart is empty or user not logged in
  React.useEffect(() => {
    if (cart.length === 0 || !user) {
      navigate('/customer/redeem');
    }
  }, [cart, user, navigate]);

  const handleConfirmRedemption = async () => {
    if (!user || !selectedMethod) return;

    setIsProcessing(true);

    try {
      // Generate redemption code for vending/agent methods
      const code = selectedMethod === 'vending' || selectedMethod === 'agent'
        ? `RDM${Date.now().toString().slice(-8)}${Math.random().toString(36).substring(2, 6).toUpperCase()}`
        : undefined;

      // Create redemption
      const redemptionData = {
        customerId: user.id,
        customerName: user.name,
        items: cart.map(item => ({
          rewardId: item.reward.id,
          rewardName: item.reward.name,
          quantity: item.quantity,
          points: item.reward.points * item.quantity,
        })),
        totalPoints,
        deliveryAddress: user.address,
        redemptionMethod: selectedMethod,
        redemptionCode: code,
      };

      createRedemption(redemptionData);
      // Refresh user data to show updated points
      refreshUser();

      // Save code for display
      if (code) {
        setRedemptionCode(code);
      }

      // Show success screen
      setShowSuccess(true);

      // Clear cart after a delay
      setTimeout(() => {
        clearCart();
        navigate('/customer/orders');
      }, 5000);
    } catch (error) {
      console.error('Redemption error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Redemption Successful!
          </h2>

          <p className="text-gray-600 mb-6">
            Your order has been confirmed
          </p>

          {redemptionCode && (
            <div className="mb-6 p-6 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Your Redemption Code</p>
              <div className="text-3xl font-bold text-primary mb-4 tracking-wider">
                {redemptionCode}
              </div>
              <p className="text-xs text-gray-500">
                {selectedMethod === 'vending'
                  ? 'Show this code at any Nestle vending machine'
                  : 'Show this code to the agent'}
              </p>
            </div>
          )}

          <div className="space-y-2 text-sm text-gray-600">
            <p>Points deducted: <span className="font-bold text-primary">{formatNumber(totalPoints)} pts</span></p>
            <p className="text-xs">Redirecting to orders page...</p>
          </div>
        </div>
      </div>
    );
  }

  const redemptionMethods = [
    {
      id: 'vending' as RedemptionMethod,
      name: 'Vending Machine',
      description: 'Get your rewards instantly at any Nestle vending machine',
      icon: BuildingStorefrontIcon,
      available: true,
    },
    {
      id: 'agent' as RedemptionMethod,
      name: 'Agent/Kiosk',
      description: 'Collect from authorized Nestycle agents',
      icon: QrCodeIcon,
      available: true,
    },
    {
      id: 'delivery' as RedemptionMethod,
      name: 'Home Delivery',
      description: 'Get your rewards delivered to your address (3-5 business days)',
      icon: TruckIcon,
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-1">Choose how you'd like to receive your rewards</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Order Summary */}
          <div className="md:col-span-2 space-y-6">
            {/* Redemption Methods */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Select Redemption Method
              </h2>

              <div className="space-y-3">
                {redemptionMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    disabled={!method.available}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedMethod === method.id
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${
                        selectedMethod === method.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{method.name}</h3>
                          {selectedMethod === method.id && (
                            <CheckCircleIcon className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            {selectedMethod && (
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedMethod === 'vending' && 'How to collect from vending machine'}
                  {selectedMethod === 'agent' && 'How to collect from agent'}
                  {selectedMethod === 'delivery' && 'Delivery information'}
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {selectedMethod === 'vending' && (
                    <>
                      <li>• You'll receive a unique redemption code</li>
                      <li>• Go to any Nestle vending machine</li>
                      <li>• Scan the QR code or enter the code</li>
                      <li>• Collect your rewards instantly</li>
                    </>
                  )}
                  {selectedMethod === 'agent' && (
                    <>
                      <li>• You'll receive a unique redemption code</li>
                      <li>• Visit any authorized Nestycle agent</li>
                      <li>• Show your redemption code</li>
                      <li>• Collect your rewards</li>
                    </>
                  )}
                  {selectedMethod === 'delivery' && (
                    <>
                      <li>• Delivery to: {user?.address}</li>
                      <li>• Expected delivery: 3-5 business days</li>
                      <li>• Free delivery for orders above 50 pts</li>
                      <li>• Track your order in the Orders page</li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.reward.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.reward.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {formatNumber(item.reward.points * item.quantity)} pts
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Items</span>
                  <span className="font-medium text-gray-900">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Total Points</span>
                  <span className="text-primary">{formatNumber(totalPoints)} pts</span>
                </div>

                {user && user.points !== undefined && (
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Your Balance</span>
                      <span className="font-medium text-gray-900">
                        {formatNumber(user.points)} pts
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">After Redemption</span>
                      <span className="font-medium text-green-600">
                        {formatNumber(user.points - totalPoints)} pts
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleConfirmRedemption}
                disabled={!selectedMethod || isProcessing}
                className="w-full mt-6 bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Processing...
                  </>
                ) : (
                  'Confirm Redemption'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
