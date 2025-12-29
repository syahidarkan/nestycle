import React from 'react';
import type { Redemption, RedemptionStatus } from '../../types';
import { formatDateTime, formatNumber } from '../../utils/formatting';
import {
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  HomeIcon,
  BuildingStorefrontIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline';

interface OrderTrackingProps {
  redemption: Redemption;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ redemption }) => {
  const getStatusInfo = (status: RedemptionStatus) => {
    const statusConfig = {
      pending: {
        label: 'Order Placed',
        color: 'blue',
        icon: ClockIcon,
        description: 'Your order has been received and is being processed',
      },
      processing: {
        label: 'Processing',
        color: 'yellow',
        icon: CheckCircleIcon,
        description: 'We are preparing your items for shipment',
      },
      shipped: {
        label: 'Shipped',
        color: 'purple',
        icon: TruckIcon,
        description: 'Your order is on the way',
      },
      delivered: {
        label: 'Delivered',
        color: 'green',
        icon: HomeIcon,
        description: 'Your order has been delivered successfully',
      },
    };

    return statusConfig[status];
  };

  const statusInfo = getStatusInfo(redemption.status);
  const StatusIcon = statusInfo.icon;

  const statuses: RedemptionStatus[] = ['pending', 'processing', 'shipped', 'delivered'];
  const currentStatusIndex = statuses.indexOf(redemption.status);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-primary p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Order #{redemption.trackingNumber}</h3>
            <p className="text-blue-100 text-sm">{formatDateTime(redemption.timestamp)}</p>
          </div>
          <div className={`px-3 py-1 rounded-full bg-${statusInfo.color}-100 text-${statusInfo.color}-700 font-semibold text-sm`}>
            {statusInfo.label}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <StatusIcon className="w-5 h-5" />
          <p className="text-sm text-blue-100">{statusInfo.description}</p>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="p-6">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{
                width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Status Steps */}
          <div className="relative grid grid-cols-4 gap-2">
            {statuses.map((status, index) => {
              const info = getStatusInfo(status);
              const StepIcon = info.icon;
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;

              return (
                <div key={status} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                      isCompleted
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-gray-200 text-gray-400'
                    } ${isCurrent ? 'scale-110' : ''}`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <p
                    className={`text-xs text-center font-medium ${
                      isCompleted ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {info.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="mt-8 space-y-4">
          <h4 className="font-semibold text-gray-900">Order Details</h4>

          {/* Items */}
          <div className="space-y-2">
            {redemption.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.rewardName}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">
                    {formatNumber(item.points)} pts
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
            <span className="font-bold text-gray-900">Total Points</span>
            <span className="text-xl font-bold text-primary">
              {formatNumber(redemption.totalPoints)} pts
            </span>
          </div>

          {/* Redemption Method */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="text-sm font-semibold text-gray-900 mb-3">Redemption Method</h5>
            <div className="flex items-center space-x-3">
              {redemption.redemptionMethod === 'vending' && (
                <>
                  <BuildingStorefrontIcon className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Vending Machine</p>
                    <p className="text-xs text-gray-600">Collect at any Nestle vending machine</p>
                  </div>
                </>
              )}
              {redemption.redemptionMethod === 'agent' && (
                <>
                  <QrCodeIcon className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Agent/Kiosk</p>
                    <p className="text-xs text-gray-600">Collect from authorized agent</p>
                  </div>
                </>
              )}
              {redemption.redemptionMethod === 'delivery' && (
                <>
                  <TruckIcon className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Home Delivery</p>
                    <p className="text-xs text-gray-600">Delivery to: {redemption.deliveryAddress}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Redemption Code (for vending/agent) */}
          {redemption.redemptionCode && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600 font-semibold mb-1">Redemption Code</p>
                  <p className="font-mono text-xl font-bold text-gray-900 tracking-wider">
                    {redemption.redemptionCode}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {redemption.redemptionMethod === 'vending'
                      ? 'Show this code at the vending machine'
                      : 'Show this code to the agent'}
                  </p>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(redemption.redemptionCode || '')}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* Tracking Number */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-semibold mb-1">Tracking Number</p>
                <p className="font-mono text-sm font-bold text-gray-900">
                  {redemption.trackingNumber}
                </p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(redemption.trackingNumber)}
                className="px-3 py-1 bg-primary hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
