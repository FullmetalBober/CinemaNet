import { createPortal } from 'react-dom';

interface IProps {
  children: React.ReactNode;
  nodeRef: React.RefObject<HTMLDivElement>;
}

const ModalContent = (props: IProps) => {
  return createPortal(
    <div
      ref={props.nodeRef}
      className="z-10 fixed bg-white w-full md:w-[48rem] h-screen right-0"
    >
      {props.children}
    </div>,
    document.getElementById('modal-hook')!
  );
};

export default ModalContent;
