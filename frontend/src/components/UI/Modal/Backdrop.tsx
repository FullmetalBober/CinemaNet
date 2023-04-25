import { createPortal } from 'react-dom';

interface BackdropProps {
  onClick: () => void;
}

const Backdrop = (props: BackdropProps) => {

  return createPortal(
    <div
      className="fixed inset-0 w-full h-screen bg-black opacity-25"
      onClick={props.onClick}
    ></div>,
    document.getElementById('backdrop-hook')!
  );
};

export default Backdrop;
