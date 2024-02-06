"use client";

import { ToastFunction } from "@/src/contexts/Toast";
import { useAuth } from "@/src/contexts/auth";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface SignInFormData {
  email: string;
  password: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({});
  const router = useRouter();
  const { signIn } = useAuth();
  const { addToast } = ToastFunction();

  async function handleLogin(data: SignInFormData) {
    try {
      await signIn({
        email: data.email,
        password: data.password,
      });

      reset();

      router.replace("/dashboard");
    } catch (error) {
      let description: any;
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;

        const data = axiosError.response?.data as { message: string };

        description = data.message;
      }

      addToast({
        type: "error",
        title: "Authentication error",
        description,
      });
    }
  }

  return (
    <>
      <div className="bg-theme-gray1-background opacity-70 bg-theme-gray1-shape-main w-[500px] rounded-md px-10 py-12 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[535px] gap-4">
        <h1 className="text-gray-100 mb-5 text-3xl font-bold">Login</h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col mt-4 gap-4"
        >
          <input
            type="text"
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 p-5 mt-6 bg-theme-green text-white font-semibold rounded-md hover:bg-theme-green-dark cursor-pointer transition ease-in duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
