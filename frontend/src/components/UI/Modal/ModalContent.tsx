import { createPortal } from 'react-dom';
import { RiCloseFill } from 'react-icons/ri';

interface IProps {
  children: React.ReactNode;
  nodeRef: React.RefObject<HTMLDivElement>;
  className?: string;
  onCancel?: () => void;
}

const ModalContent = (props: IProps) => {
  return createPortal(
    <div
      ref={props.nodeRef}
      className={`fixed z-20 w-full bg-white ${props.className}`}
    >
      <div className='relative'>
        <RiCloseFill
          onClick={props.onCancel}
          className='fixed -right-3 -top-3 m-4 h-[40px] w-[40px] cursor-pointer text-black'
        />
        {props.children}
      </div>
    </div>,
    document.getElementById('modal-hook')!
  );
};

export default ModalContent;
