"use client";

import { useState } from "react";
// import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";

const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT (Abuja)",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export default function LocationSelect({
  value,
  onChange,
  showError,
}: {
  value: string;
  onChange: (val: string) => void;
  showError?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = states.filter((state) =>
    state.toLowerCase().includes(query.toLowerCase())
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="mb-4 relative">
      <label className="block text-xs sm:text-xl font-bold text-[#1E1E1E]">
        Location <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        <input
          type="text"
          placeholder="Select or type your location"
          value={query || value}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className={`w-full border rounded px-3 py-2 pr-10 ${
            showError ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <Image
          onClick={toggleDropdown}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
          src="/images/form/map-marker-outline.svg"
          alt="icon"
          width={24}
          height={24}
        />
      </div>

      {isOpen && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-48 overflow-y-auto">
          {filtered.map((state) => (
            <li
              key={state}
              onClick={() => {
                onChange(state);
                setQuery(state);
                setIsOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {state}
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-gray-400">No match found</li>
          )}
        </ul>
      )}

      {showError && (
        <p className="text-red-500 text-sm mt-1">
          Please select a valid location
        </p>
      )}
    </div>
  );
}
