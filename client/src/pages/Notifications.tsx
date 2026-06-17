import React from 'react';
import { Bell, Check, Trash2, Mail, Calendar, CreditCard } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'email' | 'calendar' | 'billing' | 'system';
}

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ notifications, onMarkAsRead, onDelete }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail size={20} className="text-info" />;
      case 'calendar': return <Calendar size={20} className="text-warning" />;
      case 'billing': return <CreditCard size={20} className="text-success" />;
      default: return <Bell size={20} className="text-accent" />;
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Centro Notifiche</h2>
      </div>

      {notifications.length === 0 ? (
        <EmptyState 
          icon={Bell}
          title="Nessuna notifica"
          description="Non hai nuove notifiche. Ti avviseremo quando ci saranno aggiornamenti importanti."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {notifications.map(notif => (
            <div key={notif.id} className={`card flex items-start gap-4 ${!notif.read ? 'border-accent bg-accent-light bg-opacity-10' : ''}`}>
              <div className="mt-1">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-semibold ${!notif.read ? 'text-accent' : ''}`}>{notif.title}</h3>
                  <span className="text-xs text-muted">{notif.date}</span>
                </div>
                <p className="text-sm text-muted mt-1">{notif.message}</p>
              </div>
              <div className="flex gap-2">
                {!notif.read && (
                  <button className="btn-ghost btn-icon text-success" title="Segna come letta" onClick={() => onMarkAsRead(notif.id)}>
                    <Check size={18} />
                  </button>
                )}
                <button className="btn-ghost btn-icon text-danger" title="Elimina" onClick={() => onDelete(notif.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
