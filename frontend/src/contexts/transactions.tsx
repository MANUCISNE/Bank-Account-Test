'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import api from '../services/api';

export enum ETypeTransaction {
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME',
  TRANSFER = 'TRANSFER',
}

export interface Transactions {
  sender_id: string;
  recipient_id?: string;
  value: number;
  type: ETypeTransaction;
}


export interface TransactionsContextType {
  transactions: Transactions[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: Transactions) => Promise<void>;
}

export interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions');

    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback(async (data: Transactions) => {
    const { sender_id, recipient_id, value, type } = data;
    const response = await api.post('/transactions', {
      sender_id,
      recipient_id,
      value,
      type
    });
  
    setTransactions((state) => [response.data, ...state]);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
