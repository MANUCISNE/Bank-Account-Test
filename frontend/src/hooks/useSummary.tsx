import { UsersContext } from "@/contexts/UsersContext";
import { useContextSelector } from "use-context-selector";
import { useMemo } from "react";

export function useSummary() {
  const Users = useContextSelector(UsersContext, (context) => {
    return context.Users;
  });

  const totalIncome = useMemo(() => {
    return Users.reduce((acc, user) => acc + (Number(user.income) ?? 0), 0);
  }, [Users]);
  
  const totalOutcome = useMemo(() => {
    return Users.reduce((acc, user) => acc + (Number(user.outcome) ?? 0), 0);
  }, [Users]);

  const totalBalance = totalIncome - totalOutcome;

  return { totalIncome, totalOutcome, totalBalance };
}