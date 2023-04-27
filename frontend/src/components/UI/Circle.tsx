interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Circle = (props: IProps) => {
  return (
    <div
      className={`w-[68px] h-[68px] flex justify-center border-2 rounded-full border-white/25 place-items-center ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Circle;
