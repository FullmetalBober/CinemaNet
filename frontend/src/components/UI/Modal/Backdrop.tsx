import { createPortal } from 'react-dom';

interface IProps {
  onClick: () => void;
}

const Backdrop = (props: IProps) => {
  return createPortal(
    <div
      className="fixed inset-0 w-full h-screen bg-black opacity-20"
      onClick={props.onClick}
    ></div>,
    document.getElementById('backdrop-hook')!
  );
};

export default Backdrop;
