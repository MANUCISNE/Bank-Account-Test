"use client";
import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

interface FormValues {
  username: string;
  password: string;
  email: string;
}

type FormObjectValue = "username" | "password" | "email";

export function SignUp() {
  const [values, setValues] = useState<FormValues>({
    username: "",
    password: "",
    email: "",
  });
  const { Register } = useAuth();

  function handleChange(prop: FormObjectValue, value: string | number) {
    setValues({ ...values, [prop]: value });
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    const { username, password, email } = values;

    Register({
      username,
      password,
      email,
    });
  }

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-lg flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-300 mb-8">Create Account</h2>
        <input
          placeholder="Name"
          value={values.username}
          onChange={(ev) => handleChange("username", ev.target.value)}
          className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-base placeholder-gray-500 mb-4"
          required
        />
        <input
          placeholder="Email"
          value={values.email}
          className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-base placeholder-gray-500 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={(ev) => handleChange("password", ev.target.value)}
          className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-base placeholder-gray-500 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={values.password}
          onChange={(ev) => handleChange("password", ev.target.value)}
          className="w-full p-3 rounded border border-gray-300 bg-gray-200 font-medium text-base placeholder-gray-500 mb-4"
          required
        />
        <button type="submit" className="w-full h-14 p-5 mt-6 bg-theme-green text-white font-semibold rounded-md 
        hover:bg-theme-green-dark cursor-pointer transition ease-in duration-200">Register</button>
        <button className="w-full p-4 rounded text-gray-500 font-semibold text-base mt-4 inline-flex items-center justify-center transition duration-200 hover:bg-green-100">I already have an account</button>
      </form>
    </div>
  );
}
