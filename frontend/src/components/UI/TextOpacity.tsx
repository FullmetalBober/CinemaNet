interface IProps {
  children: React.ReactNode;
  className?: string;
}

const TextOpacity = (props: IProps) => {
  return <p className={`text-white/50 ${props.className}`}>{props.children}</p>;
};

export default TextOpacity;
