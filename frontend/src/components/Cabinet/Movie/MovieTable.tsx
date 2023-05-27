import { IMovie } from '../../../Interfaces';
import Currency from '../../UI/Currency';
import Table from '../../UI/Table/Table';
import TdLink from '../../UI/Table/TdLink';

interface IProps {
  movies: IMovie[];
}

const MovieTable = ({ movies }: IProps) => {
  return (
    <Table
      headers={[
        { name: 'UPDATED', type: 'date' },
        { name: 'MOVIE' },
        { name: 'RENTAL START', type: 'date' },
        { name: 'RENTAL END', type: 'date' },
        { name: 'PRICE', type: 'number' },
      ]}
    >
      {movies.map(movie => {
        const to = `/movie/${movie.slug}`;

        return (
          <tr key={movie._id} className='hover:bg-white/10'>
            <TdLink to={to} dataOrder={new Date(movie.updatedAt).getTime()}>
              {new Date(movie.updatedAt).toLocaleDateString()}
            </TdLink>
            <TdLink to={to}>{movie.name}</TdLink>
            <TdLink
              to={to}
              dataOrder={new Date(movie.rentalPeriod?.start || 0).getTime()}
            >
              {movie.rentalPeriod?.start &&
                new Date(movie.rentalPeriod?.start).toLocaleDateString()}
            </TdLink>
            <TdLink
              to={to}
              dataOrder={new Date(movie.rentalPeriod?.end || 0).getTime()}
            >
              {movie.rentalPeriod?.end &&
                new Date(movie.rentalPeriod?.end).toLocaleDateString()}
            </TdLink>

            <TdLink to={to} dataOrder={movie.price}>
              <Currency>{movie.price}</Currency>
            </TdLink>
          </tr>
        );
      })}
    </Table>
  );
};

export default MovieTable;
