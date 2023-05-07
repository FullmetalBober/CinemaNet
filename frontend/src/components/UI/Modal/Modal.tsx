import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import ModalContent from './ModalContent';
import { useRef } from 'react';
import './Modal.css';

interface IProps {
  show: boolean;
  onCancel: () => void;
  children: React.ReactNode;
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
        classNames='modal'
      >
        <ModalContent nodeRef={nodeRef} {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
