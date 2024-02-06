"use client";

import Summary from "@/src/components/Summary";
import Transactions, { ETypeTransaction } from "@/src/components/Transactions";
import api from "@/src/services/api";
import { useCallback, useEffect, useState } from "react";

export interface Transactions {
  sender_account_id: string;
  recipient_account_id?: string;
  value: number;
  type: ETypeTransaction;
  created_at: string;
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    const fetchTransactions = async (query?: string) => {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    };

    fetchTransactions();
  }, []);

  return (
    <>
      <Summary name={""} value={""} />
      <Transactions
        sender_account_id={""}
        value={0}
        type={""}
        created_at={""}
      />
    </>
  );
}
