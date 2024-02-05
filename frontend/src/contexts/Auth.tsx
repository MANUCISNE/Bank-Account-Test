'use client'

import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface IUser {
  id: string;
  email: string;
  name: string;
}

interface IUserAccount {
  type_account: string;
  id: string;
  user_id: string;
  value: number;
  created_at: string;
  updated_at: string;
}

interface IUserAccounts {
  savings_account: IUserAccount;
  current_account: IUserAccount;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: IUser;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): void;
  getUserAccountsList(): Promise<IUserAccounts>;
}

interface IUserCredentials {
  access_token: string;
  user: IUser;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<IUserCredentials>(() => {
    if (typeof window !== 'undefined') {
      const access_token = localStorage.getItem('@BankAccount:token');
      const user = localStorage.getItem('@BankAccount:user');

      if (access_token && user) {
        api.defaults.headers.authorization = `Bearer ${access_token}`;
        return { access_token, user: JSON.parse(user) };
      }
    }

    return {} as IUserCredentials;
  });

  const signIn = useCallback(async ({ email, password }: ISignInCredentials) => {
    const response = await api.post<IUserCredentials>('sessions', {
      email,
      password,
    });

    const { access_token, user } = response.data;

    if (typeof window !== 'undefined') {
      localStorage.setItem('@BankAccount:token', access_token);
      localStorage.setItem('@BankAccount:user', JSON.stringify(user));
    }

    api.defaults.headers.authorization = `Bearer ${access_token}`;

    setData({ access_token, user });
  }, []);

  const getUserAccountsList = useCallback(async (user_id: string) => {
    const response = await api.get<IUserAccount>(`/accounts/${user_id}`);
  
    return response.data;
  }, []);
  
  const signOut = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('@BankAccount:token');
      localStorage.removeItem('@BankAccount:user');
    }

    setData({} as IUserCredentials);
  }, []);

  const updateUser = useCallback(
    (user: IUser) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('@BankAccount:user', JSON.stringify(user));

        setData({
          access_token: data.access_token,
          user,
        });
      }
    },
    [setData, data.access_token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, getUserAccountsList}}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
