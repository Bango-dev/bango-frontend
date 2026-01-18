"use client";

import { useAuthCheck } from "./hooks/useAuthCheck";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Your client-side logic here
  useAuthCheck();

  return <>{children}</>;
}
