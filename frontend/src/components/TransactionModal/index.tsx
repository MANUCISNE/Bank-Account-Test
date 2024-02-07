"use client";
import { ToastFunction } from "@/src/contexts/Toast";
import api from "@/src/services/api";
import * as Dialog from "@radix-ui/react-dialog";
import axios, { AxiosError } from "axios";
import { X } from "phosphor-react";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { ETypeAccount } from "../Summary";

export enum ETypeTransaction {
  INCOME = "INCOME",
  OUTCOME = "OUTCOME",
  TRANSFER = "TRANSFER",
}

export interface ITransactionFormData {
  type_account: ETypeAccount;
  type: ETypeTransaction;
  value: number;
}

export interface ITransaction {
  sender_account: {
    type_account: ETypeAccount;
  };
  recipient_account: {
    type_account: ETypeAccount;
  };
  id: string;
  sender_account_id: string;
  recipient_account_id: string;
  value: number;
  type: ETypeTransaction;
  created_at: string;
  updated_at: string;
  value_real: number;
}

export function TransactionModal({ accounts, onTransaction }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
  } = useForm<ITransactionFormData>({});
  const { addToast } = ToastFunction();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const accountTypes = [
    { value: "", label: "Choose sender account" },
    { value: "SAVINGS_ACCOUNT", label: "Savings Account" },
    { value: "CURRENT_ACCOUNT", label: "Current Account" },
  ];

  const handleCreateTransaction = useCallback(
    async (data: ITransactionFormData) => {
      try {
        const transactionBody = { ...data, value: Number(data.value) };

        if (data.type === ETypeTransaction.TRANSFER) {
          const recipient_account_type = Object.values(ETypeAccount).find(type_account => type_account !== data.type_account)?.toLocaleLowerCase()!;
          Object.assign(transactionBody, { recipient_account_id: accounts[recipient_account_type].id })
        }

        const resp = await api.post("/transactions", transactionBody);

        const transaction = resp.data as ITransaction;

        onTransaction(transaction);

        if (buttonRef.current) {
          buttonRef.current.click();
        }

        addToast({
          type: "success",
          title: "Transaction completed!",
          description: "You can check now!",
        });

        reset();
      } catch (error) {
        let descriptions: any[] = [];

        if (axios.isAxiosError(error)) {
          const axiosError: AxiosError = error;
          const data = axiosError.response?.data as { message: string[] };

          descriptions = data.message;
        } else {
          descriptions.push(undefined);
        }

        descriptions.map((description) =>
          addToast({
            type: "error",
            title: "Error in transaction",
            description,
          })
        );
      }
    },
    [onTransaction, addToast, reset, accounts]
  );

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-theme-gray1-background opacity-70 fixed inset-0 w-full h-full" />

        <Dialog.Content className="bg-theme-gray2-shape-main w-[535px] rounded-md px-10 py-12 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[535 px]">
          <Dialog.Title className="text-3xl font-bold text-gray-300 mb-8">
            New Transaction
            <Dialog.Close>
              <div>
                <button
                  ref={buttonRef}
                  className="text-theme-gray6-base-text absolute top-6 right-6 cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>
            </Dialog.Close>
          </Dialog.Title>

          <div className="flex flex-col items-center">
            <form
              onSubmit={handleSubmit(handleCreateTransaction)}
              className="mt-6 w-full max-w-lg flex flex-col items-center"
            >
            <select
                id="type_account"
                className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-black placeholder-gray-500 mb-4"
                {...register("type_account")}
              >
                {accountTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              <select
                id="type"
                className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-black placeholder-gray-500 mb-4"
                {...register("type")}
              >
                <option value="">Choose type of transaction</option>
                <option value="INCOME">Income</option>
                <option value="OUTCOME">Outcome</option>
                <option value="TRANSFER">Transfer</option>
              </select>

              <input
                type="number"
                placeholder="Value"
                required
                {...register("value")}
                className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-black placeholder-gray-500 mb-4"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 p-5 mt-6 bg-theme-green text-white font-semibold rounded-md hover:bg-theme-green-dark cursor-pointer transition ease-in duration-200"
              >
                Register
              </button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
}
