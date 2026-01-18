
"use client";

import Navbar from "./navbar/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import { FormProvider } from "../context/FormContext";
import { useAuthCheck } from "../hooks/useAuthCheck";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
    useAuthCheck();
  return (
    <ProtectedRoute>
      <FormProvider>
        <Navbar />
        {children}
      </FormProvider>
    </ProtectedRoute>
  );
}
