import Link from "next/link";
import Image from "next/image";
type ButtonProps = {
  firstBtn: React.ReactNode;
  secondBtn: React.ReactNode;
  firstHref: string;
  secondHref: string;
  className?: string;
  src?: string;
  onClick?: () => void;
};

const Button = ({
  firstBtn,
  secondBtn,
  firstHref,
  secondHref,
  className,
  onClick,
  src,
}: ButtonProps) => {
  return (
    <div className={`btns ${className}`}>
      <Link href={firstHref}>
        <button className={`btn-primary ${className}`} onClick={onClick}>
          {firstBtn}
        </button>
      </Link>
      <Link href={secondHref}>
        <button
          className={`find-price btn-secondary flex flex-row justify-center items-center gap-2   ${className}`}
          onClick={onClick}
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
      </Link>
    </div>
  );
};
export default Button;
