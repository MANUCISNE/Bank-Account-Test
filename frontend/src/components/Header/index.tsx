"use client";
import Image from "next/image"
import Logo from '../../assets/logo.svg'

export function Header({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <header className="bg-theme-gray1-background pt-10 w-screen h-[130px]">
      <div className="container m-auto flex justify-between items-center px-6 md:px-40">
        <div className="flex align-items-center gap-4 select-none">
          <Image
            src={Logo}
            alt="Logo"
            priority
          />
          <h1 className="text-xl font-bold">Bank System</h1>
        </div>

        <div>
          {children}  
        </div>
      </div>
    </header>
  )
}
