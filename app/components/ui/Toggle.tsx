"use client";
import { useState } from "react";

export default function Toggle() {
  const [on, setOn] = useState(false);

  return (
    <button
      onClick={() => setOn(!on)}
      className={`
        relative w-12 h-6 rounded-full transition-colors duration-300
        ${on ? "bg-[#E2E3FD]" : "bg-[#E2E3FD]"}
      `}
    >
      <span
        className={`
          absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full transition-all duration-300
          ${
            on
              ? "bg-(--color-primary) translate-x-1"
              : "bg-[#ACABF6] -translate-x-5"
          }
        `}
      ></span>
    </button>
  );
}
