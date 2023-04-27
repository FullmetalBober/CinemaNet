interface IProps {
  children: React.ReactNode;
  className?: string;
}

const ModalNav = (props: IProps) => {
  return <nav className={`border-b-2 ${props.className}`}>{props.children}</nav>;
};

export default ModalNav;
