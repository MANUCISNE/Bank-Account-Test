"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { FormEvent } from "react";

import { CircleNotch, X } from "phosphor-react";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

import handlerAllUsers from '@/services/api';

interface FormValues {
  username: string;
  password: string;
}

type FormObjectValue = "username" | "password";

export function Login() {
  const [values, setValues] = useState<FormValues>({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { Authenticate } = useAuth();

  function handleChange(prop: FormObjectValue, value: string | number) {
    setValues({ ...values, [prop]: value });
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    const { username, password } = values;

    setIsSubmitting(true);
    await Authenticate({
      username,
      password,
    });

    setIsSubmitting(false);
  }

  return (
    <>
      <div
        className="bg-theme-gray1-background opacity-70 bg-theme-gray1-shape-main w-[500px] rounded-md px-10 py-12 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      md:w-[535 px] gap-4"
      >
        <Dialog.Root>
          <form onSubmit={handlerAllUsers} className="flex flex-col mt-4 gap-4">
            <Dialog.Title className="text-theme-gray7-titles text-3xl font-bold">
              Login
            </Dialog.Title>
            <input
              placeholder="User account"
              value={values.username}
              className="bg-theme-gray2-background rounded-md p-4 border border-theme-gray1-background
              placeholder:text-theme-gray5-placeholder focus:border-theme-green-dark"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={values.password}
              className="bg-theme-gray2-background rounded-md p-4 border border-theme-gray1-background
              placeholder:text-theme-gray5-placeholder focus:border-theme-green-dark"
              required
            />

            {isSubmitting ? (
              <button
                type="submit"
                className=" bg-theme-red h-14 p-5 mt-6 text-theme-gray6-base-text rounded-md
                        flex items-center justify-center cursor-not-allowed"
                disabled={isSubmitting}
              >
                <CircleNotch
                  size={20}
                  className="animate-[spin_2s_linear_infinite]"
                />
              </button>
            ) : (
              <button
                type="submit"
                className="h-14 p-5 mt-6 bg-theme-green text-theme-gray5-base-text rounded-md 
                hover:bg-theme-green-dark cursor-pointer transition ease-in duration-200"
              >
                Login
              </button>
            )}
          </form>
        </Dialog.Root>
      </div>
    </>
  );
}
