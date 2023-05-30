import { ICinema } from '../../../Interfaces';
import Table from '../../UI/Table/Table';

interface IProps {
  cinemas: ICinema[];
}

const CinemaTable = ({ cinemas }: IProps) => {
  return (
    <Table
      headers={[
        { name: 'UPDATED', type: 'date' },
        { name: 'CINEMA' },
        {
          name: 'CITY',
        },
        {
          name: 'ADDRESS',
        },
      ]}
    >
      {cinemas.map(cinema => {
        return (
          <tr key={cinema._id}>
            <td data-order={new Date(cinema.updatedAt || 0).getTime()}>
              {new Date(cinema.updatedAt).toLocaleDateString()}
            </td>
            <td>{cinema.name}</td>
            <td>{cinema.location.city}</td>
            <td>{cinema.location.address}</td>
          </tr>
        );
      })}
    </Table>
  );
};

export default CinemaTable;
