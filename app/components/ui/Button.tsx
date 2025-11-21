"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type ButtonProps = {
  firstBtn: React.ReactNode;
  secondBtn: React.ReactNode;
  firstHref?: string;
  secondHref?: string;
  className?: string;
  src?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  firstBtn,
  secondBtn,
  className = "",
  secondHref,
  firstHref,
  src,
  type = "button",
  onClick,
}: ButtonProps) => {
  const router = useRouter();

  const handleClick = (href?: string) => {
    if (onClick) onClick();
    if (href) router.push(href);
  };

  return (
    <div className={`btns flex flex-col gap-4 w-full ${className}`}>
      {/* First Button */}
      <button
        type={type}
        onClick={() => handleClick(firstHref)}
        className="btn-primary w-full flex justify-center items-center text-center"
      >
        {firstBtn}
      </button>

      {/* Second Button */}
      <button
        type={type}
        onClick={() => handleClick(secondHref)}
        className="find-price btn-secondary w-full flex justify-center items-center gap-2 text-center"
      >
        {src && <Image src={src} alt="icon" width={24} height={24} />}
        <span>{secondBtn}</span>
      </button>
    </div>
  );
};

export default Button;
