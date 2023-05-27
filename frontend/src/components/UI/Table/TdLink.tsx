import { Link } from 'react-router-dom';

interface IProps {
  to: string;
  children?: React.ReactNode;
  dataOrder?: string | number;
}

const TdLink = (props: IProps) => {
  return (
    <td data-order={props.dataOrder} className='relative'>
      {props.children}
      <Link
        to={props.to}
        target='_blank'
        className='absolute inset-0 h-full w-full'
      />
    </td>
  );
};

export default TdLink;
