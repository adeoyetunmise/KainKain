"use client";

import { useEffect } from 'react';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // Auto-hide duration in milliseconds
}

const Toast = ({ message, type, isVisible, onClose, duration = 5000 }: ToastProps) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      case 'warning':
        return 'alert-warning';
      case 'info':
      default:
        return 'alert-info';
    }
  };

  return (
    <div className="toast toast-top toast-end z-50">
      <div className={`alert ${getAlertClass()} cursor-pointer`} onClick={onClose}>
        <span>{message}</span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="btn btn-sm btn-circle btn-ghost ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
