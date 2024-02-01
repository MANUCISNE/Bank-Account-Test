import { Header } from "@/components/Header";
import { SearchForm } from "@/components/SearchForm";
import { Summary } from "@/components/Summary";
import { Table } from "@/components/Table";
import { UsersProvider } from "@/contexts/UsersContext";
import { Login } from "@/pages/Login";

export default function Home() {
  return (
    <>
      <UsersProvider>
        <Header />
      </UsersProvider>
    </>
  );
}
