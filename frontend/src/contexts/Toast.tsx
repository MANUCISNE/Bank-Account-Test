import ToastContainer from '@/components/ToastContainer/ToastContainer';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';

export interface ToastMessege {
  id: string;
  type?: 'sucess' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(menssege: Omit<ToastMessege, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessege[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessege, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(oldMensseges => [...oldMensseges, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };