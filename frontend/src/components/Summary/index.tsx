'use client';

import { PiPiggyBank, PiCoin } from 'react-icons/pi';

interface PropsAccount {
  name: ETypeAccount;
  value: string;
}

export enum ETypeAccount {
  CURRENT_ACCOUNT = 'CURRENT_ACCOUNT',
  SAVINGS_ACCOUNT = 'SAVINGS_ACCOUNT',
}

const Summary: React.FC<PropsAccount> = ({name,
  value
}) => {
    return (
      <section className="w-[280px] m-auto flex px-40 gap-8 mt-4 overflow-x-auto md:w-auto md:container lg:grid lg:grid-cols-3">
          <div className="bg-theme-gray4-shape-tertiary rounded-md p-8 min-w-[280px]">
            <header className="flex items-center justify-between text-theme-gray6-base-text">
              <span>{name}</span>
              {name === "SAVINGS_ACCOUNT" ? (
                <PiPiggyBank size={32} className="text-theme-green-light" />
              ) : (
                <PiCoin size={32} className="text-theme-blue-light" />
              )}
            </header>
            <strong className="block mt-6 text-3xl text-theme-gray7-titles">
              {value}
            </strong>
          </div>
      </section>
    );
  }

export default Summary 