"use client";
import { useToast } from "@/src/contexts/Toast";
import api from "@/src/services/api";
import * as Dialog from "@radix-ui/react-dialog";
import axios, { AxiosError } from "axios";
import { X } from "phosphor-react";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";

export enum ETypeTransaction {
  INCOME = "INCOME",
  OUTCOME = "OUTCOME",
  TRANSFER = "TRANSFER",
}

interface ISignUpFormData {
  sender_account_id: string;
  recipient_account_id?: string;
  value: number;
  type: ETypeTransaction;
  created_at: string;
}

export function TransactionModal() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ISignUpFormData>({});
  const { addToast } = useToast();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCreateTransaction = useCallback(
    async (data: ISignUpFormData) => {
      try {
        await api.post("/transactions", data);

        if (buttonRef.current) {
          buttonRef.current.click();
        }

        addToast({
          type: "success",
          title: "Transaction completed!",
          description: "You can check now!",
        });

        reset()
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
    [addToast, reset]
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
              <input
                type="text"
                placeholder="Sender account"
                required
                {...register("sender_account_id")}
                className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-black placeholder-gray-500 mb-4"
              />

              <input
                type="text"
                placeholder="Recipient account"
                required
                {...register("recipient_account_id")}
                className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-black placeholder-gray-500 mb-4"
              />

              <input
                type="value"
                placeholder="Value"
                required
                {...register("value")}
                className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-black placeholder-gray-500 mb-4"
              />

              <select
                id="type_account"
                className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-black placeholder-gray-500 mb-4"
                {...register("type")}
              >
                <option value="">Choose account</option>
                <option value="SAVINGS_ACCOUNT">Savings Account</option>
                <option value="CURRENT_ACCOUNT">Current Account</option>
              </select> 

              <input
                type="date"
                placeholder="Date of transaction"
                required
                {...register("created_at")}
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
