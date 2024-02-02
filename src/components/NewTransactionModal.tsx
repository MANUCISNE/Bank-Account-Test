"use client";
import * as Dialog from "@radix-ui/react-dialog";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "phosphor-react";

import { UsersContext } from "@/contexts/UsersContext";
import { useContextSelector } from "use-context-selector";
import { SignUp } from "@/pages/SignUp";

const newTransactionModalSchema = z.object({
  userAccount: z.string(),
  totalBalance: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]).optional(),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionModalSchema>;

export function NewTransactionModal() {
  const createUsers = useContextSelector(UsersContext, (context) => {
    return context.createUsers;
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionModalSchema),
    defaultValues: {
      type: "income",
    },
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { userAccount, totalBalance, category, type } = data;

    await createUsers({
      userAccount,
      totalBalance,
      category,
      type,
    });

    reset();
  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-theme-gray1-background opacity-70 fixed inset-0 w-full h-full" />
        <Dialog.Content
          className="bg-theme-gray2-shape-main w-[535px] rounded-md px-10 py-12 fixed 
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          md:w-[535 px]"
        >
          <Dialog.Close>
            <button className="text-theme-gray6-base-text absolute top-6 right-6 cursor-pointer ">
              <X size={24} />
            </button>
          </Dialog.Close>
          <SignUp />
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
}
