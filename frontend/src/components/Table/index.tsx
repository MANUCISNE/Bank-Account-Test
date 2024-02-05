"use client";

import { useAuth } from "@/src/contexts/auth";
import { useEffect, useState } from "react";

interface IUserAccount {
  type_account: string;
  id: string;
  user_id: string;
  value: number;
  created_at: string;
  updated_at: string;
}

export default function Table() {

  const { getUserAccountsList } = useAuth();

  const [listAccounts, setListAccounts] = useState<IUserAccount[]>([]);
  
  useEffect(() => {
    async function loadUsers() {
      const userList = await getUserAccountsList();
      setListAccounts(listAccounts);
    }
    
    loadUsers();
  }, [getUserAccountsList, listAccounts]);

  return (
    <div className="container m-auto px-6 md:px-40 mt-6">
      {listAccounts.map((listaccount: any) => {

        const diff = (Number(listaccount.income) ?? 0) - (Number(listaccount.outcome) ?? 0);
        const color = diff < 0 ? "text-theme-red" : "text-theme-green-light";

        return (
          <div
            className="bg-theme-gray3-shape-secondary grid grid-cols-5 rounded-md text-left w-full mb-2 items-center"
            key={listaccount.user_id}
          >
            <div className="py-5 px-8">
              {listaccount.type_account}
            </div>
            <div className={`py-5 px-8 ${listaccount.value >= 0 ? 'text-theme-green-light' : 'text-theme-red'}`}>
            {listaccount.value}
            </div>
            <div className="py-5 px-8">
              {listaccount.created_at}
            </div>
          </div>
        );
      })}
    </div>
  );
}
