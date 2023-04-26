interface IProps {
  children: React.ReactNode;
  hoverColor: string;
  color?: string;
  onClick: () => void;
}

const TextClick = (props: IProps) => {
  return (
    <p
      className={`${props.color} hover:text-[${props.hoverColor}] cursor-pointer transition duration-250`}
      onClick={props.onClick}
    >
      {props.children}
    </p>
  );
};

export default TextClick;
