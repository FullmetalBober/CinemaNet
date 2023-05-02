interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Tooltip = (props: IProps) => {
  return (
    <div
      className={`absolute top-full z-10 mt-1 hidden whitespace-nowrap rounded bg-black px-3 py-1 text-center text-sm group-hover:block hover:!hidden ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Tooltip;
