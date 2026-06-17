import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="empty-state">
      <Icon className="empty-state-icon" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted mb-6 max-w-md">{description}</p>
      {action}
    </div>
  );
};
