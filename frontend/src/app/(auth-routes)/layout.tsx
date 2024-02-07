"use client"

import { ReactNode, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "../../contexts/auth";
import { Header } from "@/src/components/Header";
import * as Dialog from '@radix-ui/react-dialog'
import { SignUpModal } from "./SignUp";

interface PrivateLayoutProps {
	children: ReactNode
}

export default function PrivateLayout({ children }: PrivateLayoutProps){
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      redirect('/dashboard')
    }
  }, [user]);

  return (
    <>
      <Header>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="bg-theme-green text-white h-12 font-bold px-5 rounded-md transition ease-in duration-200 cursor-pointer hover:bg-theme-green-dark">
              New account
            </button>
          </Dialog.Trigger>
          <SignUpModal />
        </Dialog.Root>
      </Header>
      {children}
    </>
  )
}
