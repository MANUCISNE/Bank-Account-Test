'use client';

import { useSummary } from '@/hooks/useSummary';
import { Coin, CurrencyDollar } from 'phosphor-react';
import { PiPiggyBank } from 'react-icons/pi';

export function Summary() {
  const summary = useSummary();

  return (
      <section
        className="w-[280px] m-auto flex px-40 gap-8 -mt-20 overflow-x-auto
        md:w-auto md:container lg:grid lg:grid-cols-3"
      >
        <div className="bg-theme-gray4-shape-tertiary rounded-md p-8 min-w-[280px]">
            <header className="flex items-center justify-between text-theme-gray6-base-text">
              <span>Savings Account</span>
              <PiPiggyBank size={32} className="text-theme-green-light" />
            </header>
            <strong className="block mt-6 text-3xl text-theme-gray7-titles">
              {summary.income}
            </strong>
          </div>
          <div className="bg-theme-gray4-shape-tertiary rounded-md p-8 min-w-[280px]">
            <header className="flex items-center justify-between text-theme-gray6-base-text">
            <span>Current Account</span>
            <Coin size={32} className="text-theme-blue-light" />
            </header>
            <strong className="block mt-6 text-3xl text-theme-gray7-titles">
              {summary.outcome}
            </strong>
          </div>
          <div className="bg-theme-green-dark rounded-md p-8 min-w-[280px]">
            <header className="flex items-center justify-between text-theme-gray6-base-text">
              <span>Total</span>
              <CurrencyDollar size={32} className="text-white" />
            </header>
            <strong className="block mt-6 text-3xl text-theme-gray7-titles">
                {summary.total}
            </strong>
          </div>
      </section>
  );
}