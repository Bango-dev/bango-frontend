"use client";

import Image from "next/image";
import React from "react";

type ButtonProps = {
  text: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  iconSrc?: string;
  loadingText?: string; // new prop
};

const SecondaryButton = ({
  text,
  className,
  onClick,
  type = "button",
  loading = false,
  disabled = false,
  iconSrc,
  loadingText = "Submitting...", // default value
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        btn-secondary 
        flex flex-row justify-center items-center 
        gap-2 
        ${className ?? ""} 
        ${isDisabled ? "cursor-not-allowed opacity-70" : ""}
      `}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}

      {!loading && iconSrc && (
        <Image
          src={iconSrc}
          alt="icon"
          width={24}
          height={24}
          className="inline-block"
        />
      )}

      {loading ? loadingText : text}
    </button>
  );
};

export default SecondaryButton;
