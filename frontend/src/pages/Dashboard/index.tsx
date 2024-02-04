import { SearchForm } from "@/components/SearchForm";
import { Summary } from "../../components/Summary";
import { Table } from "../../components/Table";
import { useAuth } from "@/contexts/Auth";
import { FiPower } from "react-icons/fi";

export function Dashboard() {
  const { signOut } = useAuth();

  return (
    <>
      <div className="max-w-[1120px] mx-auto flex items-center">
        <button type="button" onClick={signOut} className="ml-auto bg-transparent border-0">
        <FiPower className="text-gray-400 w-5 h-5" />
        </button>
      </div>
    
      <Summary />
      <SearchForm />
      <Table />
    </>
  );
}
