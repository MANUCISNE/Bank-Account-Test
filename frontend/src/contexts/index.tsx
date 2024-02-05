"use client";
import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './Toast';

export function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
}
