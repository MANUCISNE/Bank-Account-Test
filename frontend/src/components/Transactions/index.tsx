"use client";

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
    <div className="container m-auto px-6 md:px-40 mt-6">
      <div
        className="bg-theme-gray3-shape-secondary grid grid-cols-5 rounded-md text-left w-full mb-2 items-center"
        key={sender_account_id}
      >
        <div className="py-5 px-8">{type}</div>
        <div
          className={`py-5 px-8 ${
            type === ETypeTransaction.INCOME
              ? "text-theme-green-light"
              : "text-theme-red"
          }`}
        >
          {value}
        </div>
        <div className="py-5 px-8">{created_at}</div>
      </div>
    </div>
  );
};

export default Transaction;
