interface IProps {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  outline?: boolean;
}

const Button = ({
  disabled,
  onClick,
  children,
  className,
  outline,
}: IProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`mt-2 w-full rounded py-2 text-xl text-white transition ${
        outline
          ? 'outline outline-1 outline-offset-1 outline-red-500 '
          : 'bg-red-500'
      } ${
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-red-700'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
