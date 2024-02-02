import { Header } from "@/components/Header";
import { UsersProvider } from "@/contexts/UsersContext";
import { Dashboard } from "@/pages/Dashboard";

export default function Home() {
  return (
    <>
      <UsersProvider>
        <Header />
      </UsersProvider>
    </>
  );
}
