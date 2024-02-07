"use client";
import { ToastFunction } from "@/src/contexts/Toast";
import api from "@/src/services/api";
import axios, { AxiosError } from "axios";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";

interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export function FormCreateUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ISignUpFormData>({});
  const { addToast } = ToastFunction();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCreateUser = useCallback(
    async (data: ISignUpFormData) => {
      try {
        await api.post("/users", data);

        if (buttonRef.current) {
          buttonRef.current.click();
        }

        addToast({
          type: "success",
          title: "Registration completed!",
          description: "You can now login!",
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
            title: "Error in registration",
            description,
          })
        );
      }
    },
    [addToast, reset]
  );

  return (
          <div className="flex flex-col items-center">
            <form
              onSubmit={handleSubmit(handleCreateUser)}
              className="mt-6 w-full max-w-lg flex flex-col items-center"
      >
              <input
                type="name"
                placeholder="Name"
                required
                {...register("name")}
                className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-black placeholder-gray-500 mb-4"
              />

              <input
                type="email"
                placeholder="Email"
                required
                {...register("email")}
                className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-black placeholder-gray-500 mb-4"
              />

              <input
                type="password"
                placeholder="Password"
                required
                {...register("password")}
                className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-black placeholder-gray-500 mb-4"
              />

              <input
                type="password"
                placeholder="Confirm password"
                required
                {...register("confirm_password")}
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
  );
}
