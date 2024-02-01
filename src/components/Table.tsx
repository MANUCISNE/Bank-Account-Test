"use client";

import { UsersContext } from "@/contexts/UsersContext";
import { dataFormatter, totalBalanceFormatter } from "@/utils/formatter";
import { useContextSelector } from "use-context-selector";

export function Table() {
  const Users = useContextSelector(UsersContext, (context) => {
    return context.Users;
  });

  return (
    <div className="container m-auto px-6 md:px-40 mt-6">
      {Users.map((User) => {

        const diff = (Number(User.income) ?? 0) - (Number(User.outcome) ?? 0);
        const color = diff < 0 ? "text-theme-red" : "text-theme-green-light";

        return (
          <div
            className="bg-theme-gray3-shape-secondary grid grid-cols-5 rounded-md text-left w-full mb-2 items-center"
            key={User.id}
          >
            <div className="py-5 px-8">
              {User.userAccount}
            </div>
            <div className="text-theme-green-light py-5 px-8">
              {User.income}
            </div>
            <div className="text-theme-red py-5 px-8">
              - {User.outcome}
            </div>
            <div className={`py-5 px-8 ${color}`}>
              {diff}
            </div>
            <div className="py-5 px-8">
              {dataFormatter.format(new Date(User.createdAt))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
