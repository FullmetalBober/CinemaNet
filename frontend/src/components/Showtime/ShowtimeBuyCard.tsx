interface IProps {
  className?: string;
  children: React.ReactNode;
}

const ShowtimeBuyCard = (props: IProps) => {
  return (
    <div
      className={`flex items-center justify-between rounded border p-4 ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default ShowtimeBuyCard;
