"use client";

import { useState, useEffect, useRef } from "react";
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
  error,
  required = false,
   readOnly = false,
}: {
  value: string;
  onChange: (val: string) => void;
  error?: string | null;
    required?: boolean;
  readOnly?: boolean;
}) {
  const [query, setQuery] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Sync external value
  useEffect(() => {
    if (value !== query) setQuery(value || "");
  }, [value, query]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-scroll highlighted item
  useEffect(() => {
    if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightedIndex]);

  const filtered = states.filter((state) =>
    state.toLowerCase().includes(query.toLowerCase())
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="mb-4 relative" ref={dropdownRef}>
      <label className=" text-xs sm:text-lg  font-bold text-[#1E1E1E]">
        Location {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          type="text"
          placeholder="Select or type your location"
          value={query}
          onChange={(e) => {
            if (readOnly) return;
            setQuery(e.target.value);
            setIsOpen(true);
            onChange(e.target.value);
          }}
          onFocus={() => setIsOpen(true)}
           readOnly={readOnly}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setIsOpen(true);
              setHighlightedIndex((prev) =>
                prev < filtered.length - 1 ? prev + 1 : 0
              );
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setIsOpen(true);
              setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : filtered.length - 1
              );
            } else if (e.key === "Enter" && highlightedIndex >= 0) {
              e.preventDefault();
              const selected = filtered[highlightedIndex];
              onChange(selected);
              setQuery(selected);
              setIsOpen(false);
            }
          }}
          className={`w-full border rounded p-2 text-xs sm:text-sm md:text-xl  ${
            error ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 
          ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
          aria-expanded={isOpen}
          aria-controls="location-listbox"
          aria-invalid={!!error}
          aria-activedescendant={
            highlightedIndex >= 0
              ? `location-option-${highlightedIndex}`
              : undefined
          }
          aria-autocomplete="list"
          role="combobox"
        />
        <Image
          onClick={readOnly ? null : toggleDropdown}
        className={`absolute right-3 top-1/2 -translate-y-1/2 ${readOnly ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
          }`}
          src="/images/form/map-marker-outline.svg"
          alt="icon"
          width={24}
          height={24}
        />
      </div>

      {isOpen && (
        <ul
          className="absolute z-10 bg-white border text-xs sm:text-sm md:text-lg border-gray-300 rounded mt-1 w-full max-h-48 overflow-y-auto"
          role="listbox"
          id="location-listbox"
        >
          {filtered.map((state, index) => (
            <li
              key={state}
              id={`location-option-${index}`}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => {
                onChange(state);
                setQuery(state);
                setIsOpen(false);
                setHighlightedIndex(index);
              }}
              className={`px-3 py-2 cursor-pointer ${
                readOnly
                  ? "cursor-not-allowed opacity-40"
                  : highlightedIndex === index
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
              role="option"
              aria-selected={highlightedIndex === index}
            >
              {state}
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-gray-400">No match found</li>
          )}
        </ul>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
