import { createPortal } from 'react-dom';

interface IProps {
  children: React.ReactNode;
  nodeRef: React.RefObject<HTMLDivElement>;
}

const ModalContent = (props: IProps) => {
  return createPortal(
    <div
      ref={props.nodeRef}
      className="fixed right-0 z-10 h-screen w-full bg-white md:w-[48rem]"
    >
      {props.children}
    </div>,
    document.getElementById('modal-hook')!
  );
};

export default ModalContent;
