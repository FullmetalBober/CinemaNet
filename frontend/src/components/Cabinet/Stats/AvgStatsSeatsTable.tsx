import Table, { TableHeader } from '../../UI/Table/Table';
import { IAvgStats } from './CabinetStats';

interface IProps {
  avgStats: IAvgStats[];
  headers: TableHeader[];
}

const AvgStatsSeatsTable = ({ avgStats, headers }: IProps) => {
  return (
    <Table headers={headers}>
      {avgStats.map(el => {
        return (
          <tr key={el._id}>
            <td>{el._id}</td>
            <td>{el.seats}</td>
            <td>{el.seatsThisYear}</td>
            <td>{el.seatsThisMonth}</td>
            <td>{el.seatsThisWeek}</td>
            <td>{el.seatsThisDay}</td>
          </tr>
        );
      })}
    </Table>
  );
};

export default AvgStatsSeatsTable;
