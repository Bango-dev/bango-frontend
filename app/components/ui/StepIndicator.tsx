"use client";

import { usePathname } from "next/navigation";

export default function StepIndicator() {
  const pathname = usePathname();

  // Check current step from the URL
  const isStep1 = pathname.includes("step-1");
  const isStep2 = pathname.includes("step-2");

  return (
    <div className="flex justify-center items-center gap-6 mb-6">
      {/* Step 1 */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
          ${
            isStep1
              ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
              : "bg-white text-[#4D3594] border-gray-300"
          }`}
      >
        1
      </div>

      <span className="text-gray-400">—</span>

      {/* Step 2 */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
          ${
            isStep2
              ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
              : "bg-white text-[#4D3594] border-gray-300"
          }`}
      >
        2
      </div>
    </div>
  );
}
