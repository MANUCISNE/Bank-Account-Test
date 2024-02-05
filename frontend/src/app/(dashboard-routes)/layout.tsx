"use client"

import Image from "next/image"
import { ReactNode, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "../../contexts/auth";
import { Header } from "@/src/components/Header";
import UserIcon from '../../assets/user.svg'

interface PrivateLayoutProps {
	children: ReactNode
}

export default function PrivateLayout({ children }: PrivateLayoutProps){
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      redirect('/')
    }
  }, [user]);

  return (
    <>
      <Header>
        <div className="flex flex-col ml-60 items-center">
          <button className="text-gray-300 no-underline hover:opacity-80">
            <Image
              src={UserIcon}
              alt="avatar"
              priority
              className="w-10 h-10 rounded-full"
            />
          </button>
        </div>
      </Header>
      {children}
    </>
  )
}
