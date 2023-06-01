import Table from '../../UI/Table/Table';
import { IMovieStats } from './CabinetStats';

interface IProps {
  movieStats: IMovieStats[];
}

const MovieStatsTable = ({ movieStats }: IProps) => {
  return (
    <Table
      headers={[
        { name: 'CINEMA' },
        { name: 'MOST' },
        { name: 'MOST - SEATS' },
        { name: 'LEAST' },
        { name: 'LEAST - SEATS', type: 'number' },
      ]}
    >
      {movieStats.map(el => {
        return (
          <tr key={el._id}>
            <td>{el._id}</td>
            <td>{el.mostPopular.name}</td>
            <td>{el.mostPopular.count}</td>
            <td>{el.leastPopular.name}</td>
            <td>{el.leastPopular.count}</td>
          </tr>
        );
      })}
    </Table>
  );
};

export default MovieStatsTable;
