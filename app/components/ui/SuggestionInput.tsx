"use client";
import { useState, useEffect } from "react";
import api from "../../utils/api";

interface SuggestionInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  field: string;
  description?: string;
  showError?: boolean;
  required?: boolean;
  type?: string;
  className?: string;
  readOnly?: boolean;
}

export interface SearchItem {
  commodityName?: string;
  market?: string;
  sellerName?: string;
  sellerPhoneNumber?: string;
  quantity?: string;
  [key: string]: string | undefined;
}

const SuggestionInput = ({
  label,
  placeholder,
  value,
  onChange,
  field,
  description,
    showError,
    type,
  required,
  readOnly,
  className,
}: SuggestionInputProps) => {
  const [results, setResults] = useState<string[]>([]);
  //   const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userTyped, setUserTyped] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);

  // When component mounts, if value already exists, treat it as selected
  useEffect(() => {
    if (value && !userTyped) {
      setHasSelected(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!value || hasSelected === true) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        // setIsLoading(true);
        const res = await api.get("/search", {
          params: { [field]: value },
        });

        // Extract only the field values and deduplicate
        const data: string[] =
          res.data?.data?.data?.map((item: SearchItem[]) => item[field]) || [];
        setResults([...new Set(data)]);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        // setIsLoading(false);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(timeout);
  }, [value, field, hasSelected]);

  const handleSelect = (val: string) => {
    onChange(val);
    setHasSelected(true);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      <label className="text-xs sm:text-xl font-bold text-[#1E1E1E] ">
        {label}
        {required && <span className="text-red-500 ml-1  ">*</span>}
      </label>

      {description && (
        <p className="sm:text-base text-xs text-[#757575] mb-1">
          {description}
        </p>
      )}
      <input
        type={type}
        className={`w-full text-xs sm:text-sm md:text-xl border p-2 rounded ${
          showError ? "border-red-500" : "border-gray-300"
        } ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setUserTyped(true); // user typed
          setHasSelected(false); // typing means user has NOT selected yet
          onChange(e.target.value);
        }}
        onFocus={() => {
          // only show dropdown when the user typed and hasn't selected yet
          if (userTyped && !hasSelected && results.length > 0) {
            setShowDropdown(true);
          }
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        readOnly={readOnly}
      />
      {/* {isLoading && <div className="absolute right-2 top-2">Loading...</div>} */}
      {showDropdown && results.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded shadow max-h-40 overflow-auto mt-1">
          {results.map((item, idx) => (
            <li
              key={idx}
              className="p-2 hover:bg-gray-100 text-xs sm:text-sm md:text-xl cursor-pointer"
              onMouseDown={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionInput;
