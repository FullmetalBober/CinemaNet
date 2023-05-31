import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IBar } from '../../../Interfaces';
import Currency from '../../UI/Currency';
import Table from '../../UI/Table/Table';

interface IProps {
  bars: IBar[];
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

const BarTable = ({ bars, setSearchParam }: IProps) => {
  return (
    <Table
      headers={[
        { name: 'UPDATED', type: 'date' },
        { name: 'BAR' },
        { name: 'PRICE', type: 'number' },
        { name: 'UPDATE', type: 'none' },
      ]}
    >
      {bars.map(bar => {
        return (
          <tr key={bar._id}>
            <td data-order={new Date(bar.updatedAt || 0).getTime()}>
              {new Date(bar.updatedAt).toLocaleDateString()}
            </td>
            <td>{bar.name}</td>
            <td data-order={bar.price}>
              <Currency>{bar.price}</Currency>
            </td>
            <td
              onClick={() => setSearchParam(bar._id)}
              className='cursor-pointer'
            >
              <AiOutlineInfoCircle className='ml-5 text-2xl' />
            </td>
          </tr>
        );
      })}
    </Table>
  );
};

export default BarTable;
