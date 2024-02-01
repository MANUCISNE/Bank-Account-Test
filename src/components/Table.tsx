'use client';

import { TransactionsContext } from '@/contexts/TransactionsContext';
import { dataFormatter, priceFormatter } from '@/utils/formatter';
import { useContext } from 'react';
import { useContextSelector } from 'use-context-selector';

export function Table() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  return (
    <div className="container m-auto px-6 md:px-40 mt-6">
      {transactions.map((transaction) => {
        return (
          <div
            className="bg-theme-gray3-shape-secondary grid grid-cols-5 rounded-md text-left w-full mb-2 items-center"
            key={transaction.id}
          >
            <div className="py-5 px-8 col-span-2 ">
              {transaction.description}
            </div>
            {transaction.type === 'income' ? (
              <div className="text-theme-green-light py-5 px-8">
                {priceFormatter.format(transaction.price)}
              </div>
            ) : (
              <div className="text-theme-red py-5 px-8">
                - {priceFormatter.format(transaction.price)}
              </div>
            )}

            <div className="py-5 px-8">{transaction.description}</div>
            <div className="py-5 px-8 text-right">
              {dataFormatter.format(new Date(transaction.createdAt))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
