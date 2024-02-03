"use client";
import * as Yup from 'yup';
import * as Dialog from "@radix-ui/react-dialog";
import { useCallback, useRef } from "react";

import { CircleNotch } from "phosphor-react";

import { useState } from "react";
import { useAuth } from "@/contexts/Auth";
import { useToast } from "@/contexts/Toast";
import router from 'next/router';
import getValidationErrors from '@/utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}


export function Login() {
  const [values, setValues] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();

    const handleSumbit = useCallback(
      async (data: SignInFormData) => {
        try {
          formRef.current?.setErrors({});
  
          const schema = Yup.object().shape({
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail valido'),
            password: Yup.string().required('Senha obrigatório'),
          });
  
          await schema.validate(data, {
            abortEarly: false,
          });
  
          const response = await signIn({
            email: data.email,
            password: data.password,
          });
  
          if (response.status === 200) {
            router.push('/dashboard');
          } else {
            throw new Error('Erro na autenticação');
          }
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            const errors = getValidationErrors(error);
  
            formRef.current?.setErrors(errors);
  
            return;
          }
  
          addToast({
            type: 'error',
            title: 'Error na autenticação',
            description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
          });
        }
      },
      [signIn, addToast],
    );


    return (
      <>
        <div
          className="bg-theme-gray1-background opacity-70 bg-theme-gray1-shape-main w-[500px] rounded-md px-10 py-12 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      md:w-[535 px] gap-4"
        >
          <Dialog.Root>

            <form ref={formRef} className="flex flex-col mt-4 gap-4">
              <h1 className="text-gray-100 mb-5 text-3xl font-bold">
                Login
              </h1>

              <input
                placeholder="Email"
                value={values.email}
                className="bg-theme-gray200-background rounded-md p-4 border border-theme-gray1-background text-gray-100
              placeholder:text-theme-gray5-placeholder focus:border-theme-green-dark"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={values.password}
                className="bg-theme-gray200-background rounded-md p-4 border border-theme-gray1-background
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
                  className="h-14 p-5 mt-6 bg-theme-green text-white font-semibold rounded-md 
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