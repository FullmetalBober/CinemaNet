interface IProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const ShowtimeSeatCard = (props: IProps) => {
  return (
    <div
      onClick={props.onClick}
      className={`h-[28px] w-[20px] rounded ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default ShowtimeSeatCard;
