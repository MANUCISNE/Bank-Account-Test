"use client";
import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

interface FormValues {
  username: string;
  password: string;
}

type FormObjectValue = "username" | "password";

export function SignUp() {
  const [values, setValues] = useState<FormValues>({
    username: "",
    password: "",
  });
  const { Register } = useAuth();

  function handleChange(prop: FormObjectValue, value: string | number) {
    setValues({ ...values, [prop]: value });
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    const { username, password } = values;

    Register({
      username,
      password,
    });
  }

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-lg flex flex-col items-center">
        <h2 className="text-2xl text-gray-700 mb-8">Criar uma conta</h2>
        <input
          placeholder="Usuário"
          value={values.username}
          onChange={(ev) => handleChange("username", ev.target.value)}
          className="w-full p-4 rounded border border-gray-300 bg-gray-200 font-medium text-base placeholder-gray-500 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={values.password}
          onChange={(ev) => handleChange("password", ev.target.value)}
          className="w-full p-4 rounded border border-gray-300 bg-gray-200 font-medium text-base placeholder-gray-500 mb-4"
          required
        />
        <button type="submit" className="w-full p-4 rounded bg-green-500 text-white font-semibold text-base mt-4 transition duration-200 hover:bg-green-600">Fazer o registro</button>
        <a href="/" className="w-full p-4 rounded text-gray-700 font-semibold text-base mt-4 inline-flex items-center justify-center transition duration-200 hover:bg-green-100">Já tenho uma conta</a>
      </form>
    </div>
  );
}
