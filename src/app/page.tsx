import { Header } from '@/components/Header';
import { SearchForm } from '@/components/SearchForm';
import { Summary } from '@/components/Summary';
import { Table } from '@/components/Table';
import { TransactionsProvider } from '@/contexts/TransactionsContext';

export default function Home() {
   return (
      <>
         <TransactionsProvider>
            <Header />
            <Summary />
            <SearchForm />
            <Table />
         </TransactionsProvider>
      </>
   );
}
