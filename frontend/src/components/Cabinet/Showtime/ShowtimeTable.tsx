import { useNavigate } from 'react-router-dom';
import { IShowtime } from '../../../Interfaces';
import Currency from '../../UI/Currency';
import Table from '../../UI/Table/Table';
import TdLink from '../../UI/Table/TdLink';

interface IProps {
  showtimes: IShowtime[];
}

const ShowtimeTable = ({ showtimes }: IProps) => {
  const navigate = useNavigate();
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
      {showtimes.map(showtime => {
        const to = `/showtime/${showtime._id}`;

        return (
          <tr key={showtime._id} className='hover:bg-white/10'>
            <TdLink to={to} dataOrder={new Date(showtime.time.start).getTime()}>
              {new Date(showtime.time.start).toLocaleString(undefined, {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </TdLink>
            <TdLink to={to} dataOrder={new Date(showtime.time.end).getTime()}>
              {new Date(showtime.time.end).toLocaleString(undefined, {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </TdLink>
            <TdLink to={to}>{showtime.hall.name}</TdLink>
            <TdLink to={to}>{showtime.movie.name}</TdLink>
            <TdLink to={to} dataOrder={showtime.price.standard}>
              <Currency>{showtime.price.standard}</Currency>
            </TdLink>
            <TdLink to={to} dataOrder={showtime.price.lux}>
              <Currency>{showtime.price.lux}</Currency>
            </TdLink>
          </tr>
        );
      })}
    </Table>
  );
};

export default ShowtimeTable;
