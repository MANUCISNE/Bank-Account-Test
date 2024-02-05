'use client';
import {
  CreateTransactionInput,
  Transactions,
  TransactionsContextType,
  TransactionsProviderProps,
} from '@/@types/types';
import { api } from '@/lib/axios';
import { useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    });

    setTransactions(response.data);
  }, []);

  const createTransactions = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data;
      const response = await api.post('/transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      });

      setTransactions((state) => [response.data, ...state]);
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
