interface IProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollbarDiv = (props: IProps) => {
  return (
    <div
      className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default ScrollbarDiv;
