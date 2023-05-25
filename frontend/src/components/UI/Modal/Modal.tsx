import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import Backdrop from './Backdrop';
import ModalContent from './ModalContent';
import { useRef } from 'react';
import './Modal.css';

interface IProps {
  show: boolean;
  onCancel: () => void;
  children: React.ReactNode;
  position: 'center' | 'right' | 'left';
  closeColor?: 'black' | 'white';
}

const Modal = (props: IProps) => {
  const nodeRef = useRef(null);

  const modalClassNames = classnames({
    modalCenter: props.position === 'center',
    modalRight: props.position === 'right',
    modalLeft: props.position === 'left',
  });

  const contentClassNames = classnames({
    'left-1/2 top-1/2 w-[28rem] rounded-md !bg-[#2d2a2a]':
      props.position === 'center',
    'right-0 h-screen md:w-[48rem]': props.position === 'right',
    'left-0 h-screen md:w-[30rem] bg-[#2d2a2a]': props.position === 'left',
  });

  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        nodeRef={nodeRef}
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={500}
        classNames={modalClassNames}
      >
        <ModalContent
          nodeRef={nodeRef}
          {...props}
          className={contentClassNames}
        />
      </CSSTransition>
    </>
  );
};

export default Modal;
