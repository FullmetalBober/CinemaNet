interface IProps {
  children: React.ReactNode;
  className?: string;
}

const ModalNav = (props: IProps) => {
  return <nav className={`border-b ${props.className}`}>{props.children}</nav>;
};

export default ModalNav;
