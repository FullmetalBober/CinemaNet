interface IProps {
  className?: string;
  children?: React.ReactNode;
  cardSize?: {
    width: string;
    height: string;
  };
  onClick?: () => void;
}

const ShowtimeSeatCard = (props: IProps) => {
  return (
    <div
      onClick={props.onClick}
      className={`h-[28px] w-[20px] rounded ${props.className} ${props.cardSize}`}
      style={{
        width: props.cardSize?.width,
        height: props.cardSize?.height,
      }}
    >
      {props.children}
    </div>
  );
};

export default ShowtimeSeatCard;
