import { BsHandIndex } from 'react-icons/bs';
import HorizontalLine from '../HorizontalLine';
import { CSSTransition } from 'react-transition-group';
import './DangerContent.css';
import { useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  classNameChild?: string;
}

const DangerContent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const nodeRef = useRef(null);

  return (
    <details className={`w-full py-3 shadow-lg ${props.className}`}>
      <summary
        className='cursor-pointer select-none list-none'
        onClick={() => setIsOpen(prevState => !prevState)}
      >
        <HorizontalLine
          className='child:border-red-700'
          classNameChild='flex items-center text-2xl font-semibold !text-red-700'
        >
          DANGER ZONE <BsHandIndex size={23} className='ml-3' />
        </HorizontalLine>
      </summary>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames='fade'
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div className={`mt-3 ${props.classNameChild}`}>{props.children}</div>
      </CSSTransition>
    </details>
  );
};

export default DangerContent;
