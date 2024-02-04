"use client";
import { useState } from "react";
import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/Toast";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

type FormObjectValue = "name" | "password" | "email";

export function SignUp() {
  const [values, setValues] = useState<SignUpFormData>({
    name: "",
    password: "",
    email: "",
  });

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const router = useRouter();


  function handleChange(prop: FormObjectValue, value: string | number) {
    setValues({ ...values, [prop]: value });
  }

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Senha não combina',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        router.push('/');

        addToast({
          type: 'sucess',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Error no casdastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, router],
  );

  return (
    <div className="flex flex-col items-center">
      <Form
        onSubmit={handleSubmit}
        className="mt-6 w-full max-w-lg flex flex-col items-center"
        placeholder="Form Placeholder"
      >
        <h2 className="text-3xl font-bold text-gray-300 mb-8">Create Account</h2>
        <input
          placeholder="Name"
          value={values.name}
          onChange={ev => handleChange("name", ev.target.value)}
          className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-base placeholder-gray-500 mb-4"
          required
        />
        <input
          placeholder="Email"
          value={values.email}
          onChange={ev => handleChange("email", ev.target.value)}
          className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-base placeholder-gray-500 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={ev => handleChange("password", ev.target.value)}
          className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-base placeholder-gray-500 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={values.password}
          onChange={ev => handleChange("password", ev.target.value)}
          className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-base placeholder-gray-500 mb-4"
          required
        />
        <button type="submit" className="w-full h-14 p-5 mt-6 bg-theme-green text-white font-semibold rounded-md 
        hover:bg-theme-green-dark cursor-pointer transition ease-in duration-200">Register</button>
        <button className="w-full p-4 rounded text-gray-500 font-semibold text-base mt-4 inline-flex items-center justify-center transition duration-200 hover:bg-green-100">I already have an account</button>
      </Form>
    </div>
  );
}
