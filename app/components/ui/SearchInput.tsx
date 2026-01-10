"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  onClick?: () => void;
};


const SearchInput = ({
  className = "",
  onClick,
  ...props
} : SearchInputProps) => {




  return (
    <div className={`relative w-full ${className}`}>
      {/* Left Search Icon */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Image
          src="/images/timeline/search-icon.svg"
          alt="Search"
          width={12}
          height={12}
        />
      </span>

      {/* Input */}
      <input
        {...props}
        onFocus={onClick}
        onClick={onClick}
        className={`w-full rounded-full border border-gray-300 text-base p-2 pl-10 outline-none transition
          focus:ring-2 focus:ring-(--primary-color)
        `}
      />
    </div>
  );
};

export default SearchInput;
