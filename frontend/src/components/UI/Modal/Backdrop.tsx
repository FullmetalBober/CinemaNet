import { createPortal } from 'react-dom';

interface IProps {
  onClick: () => void;
}

const Backdrop = (props: IProps) => {
  return createPortal(
    <div
      className='fixed inset-0 z-20 h-screen w-full bg-black opacity-20'
      onClick={props.onClick}
    ></div>,
    document.getElementById('backdrop-hook')!
  );
};

export default Backdrop;
