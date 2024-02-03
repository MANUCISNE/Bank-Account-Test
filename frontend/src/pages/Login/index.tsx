"use client";
import * as Yup from 'yup';
import { useCallback, useRef } from "react";
import { useRouter } from 'next/navigation';
import { Form } from '@unform/web';

import { CircleNotch } from "phosphor-react";

import { useState } from "react";
import { useAuth } from "@/contexts/Auth";
import { useToast } from "@/contexts/Toast";
import getValidationErrors from '@/utils/getValidationErrors';
import { FormHandles } from '@unform/core';

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
  const router = useRouter();

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null); 

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(values, {
          abortEarly: false,
        });

        setIsSubmitting(true);

        const response = await signIn({
          email: values.email,
          password: values.password,
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
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [signIn, router, addToast, values],
  );

  return (
    <>
      <div className="bg-theme-gray1-background opacity-70 bg-theme-gray1-shape-main w-[500px] rounded-md px-10 py-12 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[535px] gap-4">
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col mt-4 gap-4"
          placeholder="Form Placeholder"
        >
          <h1 className="text-gray-100 mb-5 text-3xl font-bold">Login</h1>

          <input
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
            className="bg-theme-gray200-background rounded-md p-4 border border-theme-gray1-background text-gray-100 placeholder:text-theme-gray5-placeholder focus:border-theme-green-dark"
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
            className="bg-theme-gray200-background rounded-md p-4 border border-theme-gray1-background placeholder:text-theme-gray5-placeholder focus:border-theme-green-dark"
            required
          />

          {isSubmitting ? (
            <button
              type="submit"
              className="bg-theme-red h-14 p-5 mt-6 text-theme-gray6-base-text rounded-md flex items-center justify-center cursor-not-allowed"
              disabled={isSubmitting}
            >
              <CircleNotch size={20} className="animate-[spin_2s_linear_infinite]" />
            </button>
          ) : (
            <button
              type="submit"
              className="h-14 p-5 mt-6 bg-theme-green text-white font-semibold rounded-md hover:bg-theme-green-dark cursor-pointer transition ease-in duration-200"
            >
              Login
            </button>
          )}
        </Form>
      </div>
    </>
  );
}
