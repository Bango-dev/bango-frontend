"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
type InfoBoxProps = {
  className?: string;
};

export default function InfoBox({ className }: InfoBoxProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border rounded-md shadow-sm w-full bg-white ${className}`}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-800"
      >
        <span>Note</span>
        {open ? (
          <FaChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <FaChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Content */}
      {open && (
        <div className="px-4 pb-4 text-gray-600 text-sm">
          All prices are posted by open sources to help streamline your spending
          and search process. Bango does not post any of the prices listed.
        </div>
      )}
    </div>
  );
}
