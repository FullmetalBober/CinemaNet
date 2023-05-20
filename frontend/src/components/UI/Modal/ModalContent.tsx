import { createPortal } from 'react-dom';
import { RiCloseFill } from 'react-icons/ri';

interface IProps {
  children: React.ReactNode;
  nodeRef: React.RefObject<HTMLDivElement>;
  className?: string;
  onCancel?: () => void;
  closeColor?: 'black' | 'white';
}

const ModalContent = (props: IProps) => {
  return createPortal(
    <div
      ref={props.nodeRef}
      className={`fixed z-20 bg-white ${props.className}`}
    >
      <div className='relative'>
        {props.closeColor && (
          <RiCloseFill
            onClick={props.onCancel}
            className={`fixed -right-3 -top-3 m-4 h-[40px] w-[40px] cursor-pointer ${
              props.closeColor === 'black' ? 'text-black' : 'text-white'
            }`}
          />
        )}
        {props.children}
      </div>
    </div>,
    document.getElementById('modal-hook') as HTMLElement
  );
};

export default ModalContent;
