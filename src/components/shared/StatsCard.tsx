import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: any;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'emerald' | 'gray';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-success-50 text-success',
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-success-50 text-success',
    gray: 'bg-neutral-50 text-neutral-600',
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-card border border-neutral-200 hover:shadow-card-hover transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-neutral-600 mb-1">{title}</p>
          <p className="text-xl font-bold text-neutral-900 mb-1">{value}</p>
          {subtitle && <p className="text-xs text-neutral-500">{subtitle}</p>}
          {trend && (
            <div className={`text-xs mt-2 ${trend.isPositive ? 'text-success' : 'text-danger'}`}>
              <span>{trend.isPositive ? '↑' : '↓'} {trend.value}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
