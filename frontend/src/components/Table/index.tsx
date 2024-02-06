"use client";

import { useAuth } from "@/src/contexts/auth";
import api from "@/src/services/api";
import { useCallback, useEffect, useState } from "react";

interface IUserAccount {
  type_account: string;
  id: string;
  user_id: string;
  value: number;
  created_at: string;
  updated_at: string;
}

export enum ETypeTransaction {
  INCOME = "INCOME",
  OUTCOME = "OUTCOME",
  TRANSFER = "TRANSFER",
}

export interface Transactions {
  sender_account_id: string;
  recipient_account_id?: string;
  value: number;
  type: ETypeTransaction;
}

const Table: React.FC<Transactions> = ({
  sender_account_id,
  recipient_account_id,
  value,
  type,
}) => {
  const { getUserAccountsList } = useAuth();

  const [listAccounts, setListAccounts] = useState<IUserAccount[]>([]);

  const [transactions, setTransactions] = useState<Transactions[]>([]);

  const createTransaction = useCallback(async (data: Transactions) => {
    const { sender_account_id, recipient_account_id, value, type } = data;
    const response = await api.post("/transactions", {
      sender_account_id,
      recipient_account_id,
      value,
      type,
    });

    setTransactions((state) => [response.data, ...state]);
  }, []);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get("/transactions");

    setTransactions(response.data);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    async function loadUsers() {
      const userList = await getUserAccountsList();
      setListAccounts(listAccounts);
    }

    loadUsers();
  }, [getUserAccountsList, listAccounts]);

  return (
    <div className="container m-auto px-6 md:px-40 mt-6">
      {listAccounts.map((listaccount: any) => {
        const diff =
          (Number(listaccount.income) ?? 0) -
          (Number(listaccount.outcome) ?? 0);
        const color = diff < 0 ? "text-theme-red" : "text-theme-green-light";

        return (
          <div
            className="bg-theme-gray3-shape-secondary grid grid-cols-5 rounded-md text-left w-full mb-2 items-center"
            key={listaccount.user_id}
          >
            <div className="py-5 px-8">{listaccount.type_account}</div>
            <div
              className={`py-5 px-8 ${
                listaccount.value >= 0
                  ? "text-theme-green-light"
                  : "text-theme-red"
              }`}
            >
              {listaccount.value}
            </div>
            <div className="py-5 px-8">{listaccount.created_at}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Table;
