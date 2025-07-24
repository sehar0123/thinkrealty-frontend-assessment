import React, { useEffect } from 'react';
import type { NotificationState } from '../types';

interface NotificationProps {
  notification: NotificationState;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ notification, onClose }) => {
  const typeStyles = {
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000); // Notification disappears after 5 seconds

    // Cleanup timer on component unmount or when notification changes
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  return (
    <div className={`notification ${typeStyles[notification.type]}`}>
      <span>{notification.message}</span>
      <button onClick={onClose} className="text-sm font-medium hover:underline">
        Close
      </button>
    </div>
  );
};

export default Notification;