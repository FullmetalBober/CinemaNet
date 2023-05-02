interface IProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollbarDiv = (props: IProps) => {
  return (
    <div
      className={`overflow-y-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-w-[6px] ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default ScrollbarDiv;
