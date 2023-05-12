interface IProps {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({ disabled, onClick, children }: IProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`mt-2 w-full rounded bg-red-500 py-2 text-xl text-white transition ${
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-red-700'
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
