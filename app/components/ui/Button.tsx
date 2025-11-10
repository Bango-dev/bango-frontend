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
}: ButtonProps) => {
  const router = useRouter();

  // handle click for first button
  const handleFirstClick = () => {
    if (firstHref) router.push(firstHref);
  };

  // handle click for second button
  const handleSecondClick = () => {
    if (secondHref) router.push(secondHref);
  };
  return (
    <div className={`btns ${className}`}>

      <button
        className={`btn-primary ${className}`}
        onClick={handleFirstClick}
        type={type}
      >
        {firstBtn}
      </button>

      <button
        className={`find-price btn-secondary flex flex-row justify-center items-center gap-2   ${className}`}
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
