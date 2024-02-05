"use client";
import { ToastMessage, useToast } from '../../../contexts/Toast';
import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

interface ToastProps {
  message: ToastMessage;
  style: { marginTop: number };
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  const toastTypeVariations = {
    info: "bg-blue-100 text-blue-500",
    success: "bg-green-100 text-green-500",
    error: "bg-red-100 text-red-500",
  };

  return (
    <div
      className={`w-96 relative p-4 md:p-6 border rounded-lg shadow-md flex ${toastTypeVariations[message.type || 'info']} ${!message.description && 'items-center'}`}
      style={style}
    >
      <div className="mr-3">
        {icons[message.type || 'info']}
      </div>
      <div className="flex-1">
        <strong>{message.title}</strong>
        {message.description && <p className="mt-1 text-sm opacity-80 leading-5">{message.description}</p>}
      </div>
      {/* <button onClick={() => removeToast(message.id)} type="button" className="absolute right-4 top-5 opacity-60">
        <FiXCircle size={18} />
      </button> */}
    </div>
  );
};

export default Toast;
