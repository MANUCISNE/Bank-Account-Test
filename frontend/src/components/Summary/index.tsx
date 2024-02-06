'use client';

import { PiPiggyBank, PiCoin } from 'react-icons/pi';

interface PropsAccount {
  name: ETypeAccount;
  value: number;
}

export enum ETypeAccount {
  CURRENT_ACCOUNT = 'CURRENT_ACCOUNT',
  SAVINGS_ACCOUNT = 'SAVINGS_ACCOUNT',
}

const accountNames = {
  'SAVINGS_ACCOUNT': ['Savings Account', <PiCoin key={1} size={32} className="text-theme-blue-light" />],
  'CURRENT_ACCOUNT': ['Current Account', <PiPiggyBank key={2} size={32} className="text-theme-green-light" />],
}

const Summary: React.FC<PropsAccount> = ({ name,
  value
}) => {
    return (
      <section className="w-[150px] m-auto flex px-40 mt-4 overflow-x-auto md:w-auto md:container">
          <div className="bg-theme-gray4-shape-tertiary rounded-md p-8 min-w-[280px]">
            <header className="flex items-center justify-between text-theme-gray6-base-text">
            <span>{accountNames[name][0]}</span>
            <span></span>{accountNames[name][1]}
            </header>
            <strong className="block mt-6 text-3xl text-theme-gray7-titles">
              {value}
            </strong>
          </div>
      </section>
    );
  }

export default Summary
