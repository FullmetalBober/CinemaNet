import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import ModalContent from './ModalContent';
import { useRef } from 'react';
import './Modal.css';

interface IProps {
  show: boolean;
  onCancel: () => void;
  children: React.ReactNode;
  position: 'center' | 'right';
  closeColor?: 'black' | 'white';
}

const Modal = (props: IProps) => {
  const nodeRef = useRef(null);

  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        nodeRef={nodeRef}
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={500}
        classNames={props.position === 'center' ? 'modalCenter' : 'modalRight'}
      >
        <ModalContent
          nodeRef={nodeRef}
          {...props}
          className={
            props.position === 'center'
              ? 'left-1/2 top-1/2 w-[28rem] rounded-md !bg-[#2d2a2a]'
              : 'right-0 h-screen md:w-[48rem]'
          }
        />
      </CSSTransition>
    </>
  );
};

export default Modal;
