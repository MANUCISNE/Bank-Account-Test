'use client';
import { CircleNotch, MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from '@/contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }
  return (
    <form
      className="container m-auto px-40 mt-6 flex gap-3"
      onSubmit={handleSubmit(handleSearchTransactions)}
    >
      <input
        className="flex-1 rounded-md text-theme-gray6-base-text bg-theme-gray1-background 
            p-4 border border-theme-gray1-background
            hover:border-theme-green-dark transition ease-in duration-200 placeholder:text-theme-gray5-placeholder"
        type="text"
        placeholder="Busque uma Transação"
        {...register('query')}
      />
      {isSubmitting ? (
        <button
          className="bg-transparent w-[131px] flex items-center gap-3 p-4 border border-theme-red 
               rounded-md font-bold text-theme-white 
               cursor-not-allowed"
          disabled={!isSubmitting}
        >
          <CircleNotch
            size={20}
            className="animate-[spin_2s_linear_infinite]"
          />
          <span>Aguarde</span>
        </button>
      ) : (
        <button
          className="bg-transparent w-[131px] flex items-center gap-3 p-4 border border-theme-green rounded-md font-bold text-theme-green hover:bg-theme-green-dark hover:border-theme-green-dark hover:text-white 
               transition ease-in duration-200  "
          disabled={isSubmitting}
        >
          <MagnifyingGlass size={20} />
          <span>Buscar</span>
        </button>
      )}
    </form>
  );
}
