import React from 'react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: any;
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionLink,
  action
}) => {
  return (
    <div className="text-center py-12 px-4">
      {Icon && (
        <div className="flex justify-center mb-4">
          <Icon className="w-16 h-16 text-gray-300" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {actionLink && actionLabel && (
        <Link
          to={actionLink}
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
