import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
}
interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface UserCredentials {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const [data, setData] = useState<UserCredentials>(() => {
    const token = localStorage.getItem('@User:token');
    const user = localStorage.getItem('@BankAccount:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as UserCredentials;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post<UserCredentials>('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@User:token', token);
    localStorage.setItem('@BankAccount:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@User:token');
    localStorage.removeItem('@BankAccount:user');

    setData({} as UserCredentials);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth, AuthContext };