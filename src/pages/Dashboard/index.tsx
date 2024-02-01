import { SearchForm } from "@/components/SearchForm";
import { Summary } from "../../components/Summary";
import { Table } from "../../components/Table";

export function Dashboard() {
  return (
    <>
        <Summary />
        <SearchForm />
        <Table />
    </>
  );
}
