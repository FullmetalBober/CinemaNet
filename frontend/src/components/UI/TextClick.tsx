interface IProps {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}

const TextClick = (props: IProps) => {
  return (
    <p
      className={`${props.className} duration-250 cursor-pointer transition`}
      onClick={props.onClick}
    >
      {props.children}
    </p>
  );
};

export default TextClick;
