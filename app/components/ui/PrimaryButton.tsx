
type ButtonProps = {
  text: React.ReactNode;
  onClick?: () => void; // optional because sometimes it's just a submit button
  type?: "button" | "submit" | "reset";
  className?: string;
};

const PrimaryButton = ({
  text,
  className,
  onClick,
  type = "button",
}: ButtonProps) => {
  return (
    <div>
        <button
          className={`btn-primary w-full ${className} `}
          onClick={onClick}
          type={type}
        >
          {text}
        </button>

    </div>
  );
};
export default PrimaryButton;
