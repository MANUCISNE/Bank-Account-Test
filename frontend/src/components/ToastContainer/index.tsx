"use client";
import React from 'react';
import { useTransition } from 'react-spring';
import { ToastMessage } from '../../contexts/Toast';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    messages => messages.id,
    {
      from: { right: '-120%', opacity: 0, marginTop: 5 },
      enter: { right: '0%', opacity: 1, marginTop: 5 },
      leave: { right: '-120%', opacity: 0, marginTop: 5 },
    },
  );

  return (
    <div className="absolute right-0 top-0 p-8 overflow-hidden z-1" style={{ zIndex: '1' }}>
      {messagesWithTransitions.map(({ item, key, props }: { item: ToastMessage, key: any, props: any }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </div>
  );
};

export default ToastContainer;