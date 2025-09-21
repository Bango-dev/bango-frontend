import Link from "next/link";
type ButtonProps = {
  firstBtn: React.ReactNode;
  secondBtn: React.ReactNode;
  className?: string;
};

const Button = ({ firstBtn, secondBtn, className }: ButtonProps) => {
  return (
    <div className={`btns ${className}`}>
      <Link href="/">
        <button className="btn-primary">{firstBtn}</button>
      </Link>
      <Link href="/comming-soon">
        <button className=" find-price btn-secondary ">{secondBtn}</button>
      </Link>
    </div>
  );
};
export default Button;
