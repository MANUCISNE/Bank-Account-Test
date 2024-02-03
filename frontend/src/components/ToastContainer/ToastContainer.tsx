import React from 'react';
import { useTransition } from 'react-spring';
import Toast from './Toast/toast';
import { ToastMessege } from '@/contexts/Toast';

interface ToastContainerProps {
  messages: ToastMessege[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    (message: { id: any; }) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    }
  ) as unknown as any[]
  return (
    <div className="absolute right-0 top-0 p-8 overflow-hidden">
      {messagesWithTransitions.map(({ item, key, props }: { item: ToastMessege, key: any, props: any }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </div>
  );
};

export default ToastContainer;