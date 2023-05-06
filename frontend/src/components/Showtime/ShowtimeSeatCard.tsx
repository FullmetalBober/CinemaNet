interface IProps {
  className?: string;
  children?: React.ReactNode;
}

const ShowtimeSeatCard = (props: IProps) => {
  return (
    <div className={`h-[28px] w-[20px] rounded ${props.className}`}>
      {props.children}
    </div>
  );
};

export default ShowtimeSeatCard;
