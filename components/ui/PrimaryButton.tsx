import Link from "next/link";
type ButtonProps = {
  text: React.ReactNode;
  href: string;

  className?: string;
};

const PrimaryButton = ({ text, href, className }: ButtonProps) => {
  return (
    <div>
      <Link href={href}>
        <button className={`btn-primary w-full ${className} `}>{text}</button>
      </Link>
    </div>
  );
};
export default PrimaryButton;
