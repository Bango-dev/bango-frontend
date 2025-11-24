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
  className,
  secondHref,
  firstHref,
  src,
  type,
  onClick,
}: ButtonProps) => {
  const router = useRouter();

  const handleFirstClick = () => {
    if (onClick) onClick();
    if (firstHref) router.push(firstHref);
  };

  const handleSecondClick = () => {
    if (onClick) onClick();
    if (secondHref) router.push(secondHref);
  };

  return (
    <div className={`btns ${className}`}>
      <button
        className={`find-price btn-primary flex flex-row justify-center items-center ${className} `}
        onClick={handleFirstClick}
        type={type}
      >
        {firstBtn}
      </button>

      <button
        className="find-price btn-secondary flex flex-row justify-center items-center gap-2"
        onClick={handleSecondClick}
      >
        {src && (
          <Image
            src={src}
            alt="icon"
            width={24}
            height={24}
            className="inline-block"
          />
        )}
        <span>{secondBtn}</span>
      </button>
    </div>
  );
};

export default Button;
