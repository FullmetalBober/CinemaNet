import Table, { TableHeader } from '../../UI/Table/Table';
import { IAvgStats } from './CabinetStats';

interface IProps {
  avgStats: IAvgStats[];
  headers: TableHeader[];
}

const AvgStatsBarTable = ({ avgStats, headers }: IProps) => {
  return (
    <Table headers={headers}>
      {avgStats.map(el => {
        return (
          <tr key={el._id}>
            <td>{el._id}</td>
            <td>{el.barOrders}</td>
            <td>{el.barOrdersThisYear}</td>
            <td>{el.barOrdersThisMonth}</td>
            <td>{el.barOrdersThisWeek}</td>
            <td>{el.barOrdersThisDay}</td>
          </tr>
        );
      })}
    </Table>
  );
};

export default AvgStatsBarTable;
