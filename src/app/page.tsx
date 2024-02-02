import { Header } from "@/components/Header";
import { UsersProvider } from "@/contexts/UsersContext";

export default function Home() {
  return (
    <>
      <UsersProvider>
        <Header />
      </UsersProvider>
    </>
  );
}
