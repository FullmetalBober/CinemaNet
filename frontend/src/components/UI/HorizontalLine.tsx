interface IProps {
  children?: React.ReactNode;
  className?: string;
  classNameChild?: string;
}

const HorizontalLine = (props: IProps) => {
  return (
    <div className={`flex items-center ${props.className}`}>
      <div className='flex-grow border-t-2 border-white/[.15]'></div>
      <div
        className={`flex-shrink-0 px-3 text-white/50 ${props.classNameChild}`}
      >
        {props.children}
      </div>
      <div className='flex-grow border-t-2 border-white/[.15]'></div>
    </div>
  );
};

export default HorizontalLine;
