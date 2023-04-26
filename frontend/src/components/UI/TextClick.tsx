interface IProps {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}

const TextClick = (props: IProps) => {
  return (
    <p
      className={`${props.className} cursor-pointer transition duration-250`}
      onClick={props.onClick}
    >
      {props.children}
    </p>
  );
};

export default TextClick;
