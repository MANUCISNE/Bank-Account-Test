"use client";

import { useAuth } from "@/src/contexts/auth";
import { useEffect, useState } from "react";

interface IUser {
  id: string;
  name: string;
}

export default function Table() {
  const { getUsersList } = useAuth();

  const [users, setUsers] = useState<IUser[]>([]);
  
  useEffect(() => {
    async function loadUsers() {
      const userList = await getUsersList();
      setUsers(userList);
    }
    
    loadUsers();
  }, [getUsersList]);

  return (
    <div className="container m-auto px-6 md:px-40 mt-6">
      {users.map((user: any) => {

        const diff = (Number(user.income) ?? 0) - (Number(user.outcome) ?? 0);
        const color = diff < 0 ? "text-theme-red" : "text-theme-green-light";

        return (
          <div
            className="bg-theme-gray3-shape-secondary grid grid-cols-5 rounded-md text-left w-full mb-2 items-center"
            key={user.id}
          >
            <div className="py-5 px-8">
              {user.name}
            </div>
            <div className="text-theme-green-light py-5 px-8">
              {user.income}
            </div>
            <div className="text-theme-red py-5 px-8">
              - {user.outcome}
            </div>
            <div className={`py-5 px-8 ${color}`}>
              {diff}
            </div>
            <div className="py-5 px-8">
              {String(new Date(user.created_at))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
