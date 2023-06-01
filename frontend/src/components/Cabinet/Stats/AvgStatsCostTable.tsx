import Table, { TableHeader } from '../../UI/Table/Table';
import { IAvgStats } from './CabinetStats';

interface IProps {
  avgStats: IAvgStats[];
  headers: TableHeader[];
}

const AvgStatsCostTable = ({ avgStats, headers }: IProps) => {
  return (
    <Table headers={headers}>
      {avgStats.map(el => {
        return (
          <tr key={el._id}>
            <td>{el._id}</td>
            <td>{el.cost}</td>
            <td>{el.costThisYear}</td>
            <td>{el.costThisMonth}</td>
            <td>{el.costThisWeek}</td>
            <td>{el.costThisDay}</td>
          </tr>
        );
      })}
    </Table>
  );
};

export default AvgStatsCostTable;
