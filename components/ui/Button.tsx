import Link from "next/link";
type ButtonProps = {
  firstBtn: React.ReactNode;
  secondBtn: React.ReactNode;
  firstHref: string;
  secondHref: string;
  className?: string;
};

const Button = ({
  firstBtn,
  secondBtn,
  firstHref,
  secondHref,
  className,
}: ButtonProps) => {
  return (
    <div className={`btns ${className}`}>
      <Link href={firstHref}>
        <button className="btn-primary">{firstBtn}</button>
      </Link>
      <Link href={secondHref}>
        <button className="find-price btn-secondary">{secondBtn}</button>
      </Link>
    </div>
  );
};
export default Button;
