"use client";

import { dataFormatter, valueFormatter } from "@/src/utils/formatter";
import { ETypeAccount } from "../Summary";
import { ETypeTransaction, ITransaction } from "../TransactionModal";


interface ITransactionProps {
  type_account: ETypeAccount;
  created_at: string,
  value: number,
  type: ETypeTransaction,
}

const colorValues = {
  [ETypeTransaction.INCOME]: "text-theme-green-light",
  [ETypeTransaction.OUTCOME]: "text-theme-red",
  [ETypeTransaction.TRANSFER]: "text-yellow-500",
}

const Transaction: React.FC<ITransaction> = ({
  sender_account,
  recipient_account,
  created_at,
  value,
  type,
}) => {
  return (
    <div className="container m-auto md:px-40 mt-6 items-center">
      <div
        className="bg-theme-gray3-shape-secondary grid grid-cols-4 rounded-md w-full mb-2 justify-items-stretch"
      >
        <div className="py-5 px-8 text-center">{type === ETypeTransaction.TRANSFER ? "" : sender_account.type_account}</div>
        <div className="py-5 px-8 text-center">{type}</div>
        <div
          className={`py-5 px-8 ${
            colorValues[type]
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
