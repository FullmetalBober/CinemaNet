interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Circle = (props: IProps) => {
  return (
    <div
      className={`flex h-[68px] w-[68px] place-items-center justify-center rounded-full border-2 border-white/25 ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Circle;
