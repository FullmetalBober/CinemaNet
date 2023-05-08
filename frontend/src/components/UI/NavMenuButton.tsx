interface IProps {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}

const NavMenuButton = (props: IProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`text-xl font-bold transition hover:text-red-500 ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default NavMenuButton;
