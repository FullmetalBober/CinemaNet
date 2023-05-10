interface IProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const ButtonAuthControl = ({ children, onClick, className }: IProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-2xl font-semibold transition hover:text-red-500 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonAuthControl;
