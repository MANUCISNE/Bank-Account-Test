"use client";
import {
  CreateTransactionInput,
  Users,
  UsersContextType,
  UsersProviderProps,
} from "@/@types/types";
import { api } from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";

export const UsersContext = createContext({} as UsersContextType);

export function UsersProvider({ children }: UsersProviderProps) {
  const [Users, setUsers] = useState<Users[]>([]);

  const fetchUsers = useCallback(async (query?: string) => {
    const response = await api.get("Users", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setUsers(response.data);
  }, []);

  const createUsers = useCallback(async (data: CreateTransactionInput) => {
    const { userAccount, totalBalance, category, type } = data;
    const response = await api.post("Users", {
      userAccount,
      totalBalance,
      category,
      type,
      createdAt: new Date(),
    });

    setUsers((state) => [response.data, ...state]);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <UsersContext.Provider value={{ Users, fetchUsers, createUsers }}>
      {children}
    </UsersContext.Provider>
  );
}
