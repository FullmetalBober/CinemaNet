import { IShowtime } from '../../../Interfaces';
import Currency from '../../UI/Currency';
import Table from '../../UI/Table';

interface IProps {
  showtimes: IShowtime[];
}

const ShowtimeTable = ({ showtimes }: IProps) => {
  return (
    <Table
      headers={[
        { name: 'DATE START', type: 'date' },
        { name: 'DATE END', type: 'date' },
        { name: 'HALL' },
        { name: 'MOVIE' },
        { name: 'PRICE STANDARD', type: 'number' },
        { name: 'PRICE LUX', type: 'number' },
      ]}
    >
      {showtimes.map(showtime => (
        <tr key={showtime._id}>
          <td data-order={new Date(showtime.time.start).getTime()}>
            {new Date(showtime.time.start).toLocaleString(undefined, {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </td>
          <td data-order={new Date(showtime.time.end).getTime()}>
            {new Date(showtime.time.end).toLocaleString(undefined, {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </td>
          <td>{showtime.hall.name}</td>
          <td>{showtime.movie.name}</td>
          <td data-order={showtime.price.standard}>
            <Currency>{showtime.price.standard}</Currency>
          </td>
          <td data-order={showtime.price.lux}>
            <Currency>{showtime.price.lux}</Currency>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default ShowtimeTable;
