import { createPortal } from 'react-dom';

interface ModalOverlayProps {
  children: React.ReactNode;
  nodeRef: React.RefObject<HTMLDivElement>;
}

const ModalContent = (props: ModalOverlayProps) => {
  return createPortal(
    <div ref={props.nodeRef} className="z-10 fixed bg-white w-2/6 h-screen right-0">
      {props.children}
    </div>,
    document.getElementById('modal-hook')!
  );
};

export default ModalContent;
