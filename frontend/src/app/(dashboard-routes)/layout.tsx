"use client";

import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/src/contexts/Auth";
import { FiPower } from "react-icons/fi";
import { Header } from "@/src/components/Header";
import UserIcon from "../../assets/user.svg";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, [user]);

  return (
    <>
      <Header>
        <div className="flex ml-60 items-center">
          <button className="text-gray-300 no-underline hover:opacity-80">
            <Image
              src={UserIcon}
              alt="avatar"
              priority
              className="w-10 h-10 rounded-full"
            />
          </button>
          <div className="max-w-[1120px] mx-auto flex items-center">
            <button
              type="button"
              onClick={signOut}
              className="ml-3  bg-transparent border-0"
            >
              <FiPower className="text-gray-400 w-5 h-5" />
            </button>
          </div>
        </div>
      </Header>
      {children}
    </>
  );
}
