import React from "react";
import Image from "next/image";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  rightIcon?: string;
  leftIcon?: string;
  onRightIconClick?: () => void;
  labelClassName?: string;
  inputClassName?: string;
  showError?: boolean;
  onIconClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  description,
  rightIcon,
  leftIcon,
  onRightIconClick,
  className = "",
  labelClassName = "",
  inputClassName = "",
  showError = false,
  onIconClick,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <>
          <label
            className={`text-xs sm:text-sm md:text-base  font-bold text-[#1E1E1E] ${labelClassName}`}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {description && (
            <span className="sm:text-base text-xs text-[#757575] mb-1">
              {description}
            </span>
          )}
        </>
      )}

      <div className={`relative w-full ${className}`}>
        {/* Left Search Icon */}
        {leftIcon && (
          <span className="absolute left-3 top-1/2  -translate-y-1/2 pointer-events-none">
            <Image
              src="/images/timeline/search-icon.svg"
              alt="Search"
              width={12}
              height={12}
            />
          </span>
        )}

        <input
          {...props}
          className={`border ${
            showError ? "border-red-500" : "border-gray-300"
          } rounded-md text-base  p-2 outline-none focus:ring-2 focus:ring-(--primary-color) focus:border-(--primary-color) transition w-full  ${className} ${inputClassName}`}
        />
        {rightIcon && (
          <span
            className=" text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none flex items-center cursor-pointer"
            onClick={onRightIconClick}
          >
            <Image
              src={rightIcon}
              onClick={onIconClick}
              alt="icon"
              width={24}
              height={24}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
