import { ReactNode } from 'react';

export interface Users {
  outcome: ReactNode;
  income: ReactNode;
  id: number;
  userAccount: string;
  type: 'income' | 'outcome';
  totalBalance: number;
  category: string;
  createdAt: string;
}

export interface UsersContextType {
  Users: Users[];
  fetchUsers: (query?: string) => Promise<void>;
  createUsers: (data: CreateTransactionInput) => Promise<void>;
}

export interface UsersProviderProps {
  children: ReactNode;
}

export interface CreateTransactionInput {
  userAccount: string;
  type?: 'income' | 'outcome';
  totalBalance: number;
  category: string;
}
