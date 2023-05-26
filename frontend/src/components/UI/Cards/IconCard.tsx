interface IProps {
  children: React.ReactNode;
  className?: string;
}

const IconCard = ({ children, className }: IProps) => {
  return (
    <div
      className={`flex h-full items-center justify-center bg-white/50 p-2 text-center text-4xl text-black ${className}`}
    >
      {children}
    </div>
  );
};

export default IconCard;
