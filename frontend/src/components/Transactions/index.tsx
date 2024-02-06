"use client";

import { dataFormatter, valueFormatter } from "@/src/utils/formatter";

export enum ETypeTransaction {
  INCOME = "INCOME",
  OUTCOME = "OUTCOME",
  TRANSFER = "TRANSFER",
}

export interface Transactions {
  sender_account_id: string;
  recipient_account_id?: string;
  value: number;
  type: ETypeTransaction;
  created_at: string;
}

const Transaction: React.FC<Transactions> = ({
  sender_account_id,
  recipient_account_id,
  created_at,
  value,
  type,
}) => {
  return (
    <div className="container m-auto md:px-40 mt-6 items-center">
      <div
        className="bg-theme-gray3-shape-secondary grid grid-cols-3 rounded-md w-full mb-2 justify-items-stretch"
        key={sender_account_id}
      >
        <div className="py-5 px-8 text-center">{type}</div>
        <div
          className={`py-5 px-8 ${
            type === ETypeTransaction.INCOME
              ? "text-theme-green-light"
              : "text-theme-red"
          } text-center`}
        >
          {valueFormatter.format(value)}
        </div>
        <div className="py-5 px-8 text-center">
          {" "}
          {dataFormatter.format(new Date(created_at))}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
