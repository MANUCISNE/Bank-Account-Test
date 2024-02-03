"use client";
import * as Dialog from "@radix-ui/react-dialog";

import { X } from "phosphor-react";

import { UsersContext } from "@/contexts/UsersContext";
import { useContextSelector } from "use-context-selector";
import { SignUp } from "@/pages/SignUp";

export function NewTransactionModal() {
  const createUsers = useContextSelector(UsersContext, (context) => {
    return context.createUsers;
  });

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
