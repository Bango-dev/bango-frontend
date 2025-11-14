type ButtonProps = {
  text: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean; // for spinner + text change
  disabled?: boolean; // manual disable
};

const PrimaryButton = ({
  text,
  className,
  onClick,
  type = "button",
  loading = false,
  disabled = false,
}: ButtonProps) => {
  const isDisabled = disabled || loading; // button disabled if either is true

  return (
    <button
      className={`btn-primary w-full flex items-center justify-center gap-2 ${
        isDisabled ? "cursor-not-allowed opacity-70" : ""
      } ${className}`}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      {loading ? "Submitting..." : text}
    </button>
  );
};

export default PrimaryButton;
