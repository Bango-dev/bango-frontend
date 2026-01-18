// app/p/[id]/page.tsx
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ShortLinkRedirect() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      // Redirect to the full detail page
      router.replace(`/timeline/${id}`);
    }
  }, [id, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">Redirecting...</div>
    </div>
  );
}
