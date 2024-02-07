"use client"

import { useState, useEffect, useCallback } from 'react';
import api from '@/src/services/api';
import Summary, { ETypeAccount } from '@/src/components/Summary';
import Transactions from '@/src/components/Transactions';
import * as Dialog from '@radix-ui/react-dialog';
import { ITransaction, TransactionModal } from '@/src/components/TransactionModal';

export interface IAccount {
  current_account: AccountType;
  savings_account: AccountType;
};

export interface AccountType {
  id: string;
  type_account: ETypeAccount;
  user_id: string;
  value: number;
  created_at: Date;
  updated_at: Date;
}

export default function Dashboard() {
  const [accounts, setAccounts] = useState<IAccount>({} as IAccount);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);


  useEffect(() => {
    api.get('/accounts').then(resp => {
      setAccounts(resp.data)
    });
  }, [transactions]);
  
  useEffect(() => {
    api.get('/transactions').then(resp => {
      setTransactions(resp.data)
    });
  }, []);

  const handleNewTransaction = useCallback((transaction: ITransaction) => {
    setTransactions((prevTransactions) => [transaction, ...prevTransactions]);
  }, []);

  return (
    <>
      <div className="flex">
        {(Object.entries(accounts) as [string, IAccount][]).map(([key, account]) => {
          return (<Summary key={account[0]} name={key.toLocaleUpperCase() as ETypeAccount} value={accounts[key].value} />)
        })}
      </div>

      <div className="flex justify-center mt-4">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="bg-theme-green text-white h-12 font-bold px-5 rounded-md transition ease-in duration-200 cursor-pointer hover:bg-theme-green-dark">
              New transaction
            </button>
          </Dialog.Trigger>
          <TransactionModal onTransaction={handleNewTransaction} accounts={accounts} />
        </Dialog.Root>
      </div>
      
      {transactions.length > 0 && transactions.map((transaction) => (
        <Transactions
          key={transaction.id}
          {...transaction}
        />
      ))}
    </>
  );
}
