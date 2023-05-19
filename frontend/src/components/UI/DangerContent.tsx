import { BsHandIndex } from 'react-icons/bs';
import HorizontalLine from './HorizontalLine';

interface Props {
  children: React.ReactNode;
  className?: string;
  classNameChild?: string;
}

const DangerContent = (props: Props) => {
  return (
    <details className={`w-full cursor-pointer shadow-lg ${props.className}`}>
      <summary className='list-none'>
        <HorizontalLine
          className='mt-10 child:border-red-700'
          classNameChild='flex items-center text-2xl font-semibold text-red-700'
        >
          DANGER ZONE <BsHandIndex size={23} className='ml-3' />
        </HorizontalLine>
      </summary>
      <div className={`mt-3 ${props.classNameChild}`}>{props.children}</div>
    </details>
  );
};

export default DangerContent;
