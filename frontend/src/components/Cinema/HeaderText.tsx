interface IProps {
  children: React.ReactNode;
  className?: string;
}

const HeaderText = (props: IProps) => {
  return (
    <nav className={`border-b-2 ${props.className}`}>{props.children}</nav>
  );
};

export default HeaderText;
