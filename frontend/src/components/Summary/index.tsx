'use client';

import { useAuth } from '@/src/contexts/auth';
import { CurrencyDollar } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { PiPiggyBank, PiCoin } from 'react-icons/pi';

interface IUserAccount {
  type_account: string;
  id: string;
  user_id: string;
  value: number;
  created_at: string;
  updated_at: string;
}

export function Summary() {
  const { getUserAccountsList } = useAuth();

  const [accounts, setAccounts] = useState<IUserAccount | null>(null);
  
  useEffect(() => {
      async function fetchData() {
        const data = await getUserAccountsList();
        setAccounts(data as IUserAccount | null);
      }

      fetchData();
    }, [getUserAccountsList]);
  
    return (
      <section className="w-[280px] m-auto flex px-40 gap-8 mt-4 overflow-x-auto md:w-auto md:container lg:grid lg:grid-cols-3">
        {accounts && (
          <>
            <div className="bg-theme-gray4-shape-tertiary rounded-md p-8 min-w-[280px]">
              <header className="flex items-center justify-between text-theme-gray6-base-text">
                <span>Savings Account</span>
                <PiPiggyBank size={32} className="text-theme-green-light" />
              </header>
              <strong className="block mt-6 text-3xl text-theme-gray7-titles">
                {accounts.type_account}
              </strong>
            </div>
            <div className="bg-theme-gray4-shape-tertiary rounded-md p-8 min-w-[280px]">
              <header className="flex items-center justify-between text-theme-gray6-base-text">
                <span>Current Account</span>
                <PiCoin size={32} className="text-theme-blue" />
              </header>
              <strong className="block mt-6 text-3xl text-theme-gray7-titles">
                {accounts.type_account}
              </strong>
            </div>
            <div className="bg-theme-green-dark rounded-md p-8 min-w-[280px]">
              <header className="flex items-center justify-between text-theme-gray6-base-text">
                <span>Total</span>
                <CurrencyDollar size={32} className="text-white" />
              </header>
              <strong className="block mt-6 text-3xl text-theme-gray7-titles">
                {'total'}
              </strong>
            </div>
          </>
        )}
      </section>
    );
  }
  