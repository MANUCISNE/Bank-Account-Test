"use client"

import { useState, useEffect } from 'react';
import api from '@/src/services/api';
import Summary from '@/src/components/Summary';
import Transactions, { ETypeTransaction } from '@/src/components/Transactions';
import * as Dialog from '@radix-ui/react-dialog';
import { TransactionModal } from '@/src/components/TransactionModal';

export interface Transactions {
  sender_account_id: string;
  recipient_account_id?: string;
  value: number;
  type: ETypeTransaction;
  created_at: string;
}

export interface IAccount {
  created_at: string;
  ide: string;
  type_account: ETypeAccount;
  updated_at: string;
  user_id: string;
  value: number;
}
export interface Response {
  current_account: IAccount;
  savings_account: IAccount;
}

export enum ETypeAccount {
  CURRENT_ACCOUNT = 'CURRENT_ACCOUNT',
  SAVINGS_ACCOUNT = 'SAVINGS_ACCOUNT',
}


export default function Dashboard() {
  const [accounts, setAccounts] = useState<Response | null>(null);
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    const fetchAccountsAndTransactions = async () => {
      const accountsResponse = await api.get<Response>('/accounts');
      setAccounts(accountsResponse.data);

      const transactionsResponse = await api.get('/transactions');
      setTransactions(transactionsResponse.data);
    };

    fetchAccountsAndTransactions();
  }, []);

  return (
    <>
      <div className="flex">
        {accounts && <Summary name={ETypeAccount.SAVINGS_ACCOUNT} value={accounts.savings_account.value || 0} />}
        
        {accounts && <Summary name={ETypeAccount.CURRENT_ACCOUNT} value={accounts.current_account.value || 0} />}
      </div>

      <div className="flex justify-center mt-4">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="bg-theme-green text-white h-12 font-bold px-5 rounded-md transition ease-in duration-200 cursor-pointer hover:bg-theme-green-dark">
              New transaction
            </button>
          </Dialog.Trigger>
          <TransactionModal />
        </Dialog.Root>
      </div>
      
      {transactions.length > 0 && transactions.map((transaction) => (
        <Transactions key={transaction.sender_account_id} {...transaction} />
      ))}
    </>
  );
}
