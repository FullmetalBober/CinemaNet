import { IBar } from '../../../Interfaces';
import Currency from '../../UI/Currency';
import Table from '../../UI/Table/Table';

interface IProps {
  bars: IBar[];
}

const BarTable = ({ bars }: IProps) => {
  return (
    <Table
      headers={[
        { name: 'UPDATED', type: 'date' },
        { name: 'BAR' },
        { name: 'PRICE', type: 'number' },
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
          </tr>
        );
      })}
    </Table>
  );
};

export default BarTable;
