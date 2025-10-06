import React from "react";
import Image from "next/image";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  rightIcon?: string;
  onRightIconClick?: () => void;
  labelClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  description,
  rightIcon,
  onRightIconClick,
  className = "",
  labelClassName = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <>
          <label
            className={`text-xl font-bold text-[#1E1E1E] ${labelClassName}`}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {description && (
            <span className="text-base text-[#757575] mb-1">{description}</span>
          )}
        </>
      )}
      <div className={`relative w-full ${className}`}>
        <input
          {...props}
          className={`border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition w-full pr-10 ${className}`}
        />
        {rightIcon && (
          <span
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={onRightIconClick}
          >
            <Image src={rightIcon} alt="icon" width={24} height={24} />
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
