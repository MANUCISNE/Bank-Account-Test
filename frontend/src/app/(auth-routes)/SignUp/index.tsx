"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { useRef } from "react";
import { FormCreateUser } from "./form";

export function SignUpModal() {

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
      <Dialog.Root>
        <Dialog.Overlay className="bg-theme-gray1-background opacity-70 fixed inset-0 w-full h-full" />

        <Dialog.Content className="bg-theme-gray2-shape-main w-[535px] rounded-md px-10 py-12 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[535 px]">
          <Dialog.Title className="text-3xl font-bold text-gray-300 mb-8">
            SignUp
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
          <FormCreateUser />
        </Dialog.Content>
      </Dialog.Root>
  );
}
