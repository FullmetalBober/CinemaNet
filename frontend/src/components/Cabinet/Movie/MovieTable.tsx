import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IMovie } from '../../../Interfaces';
import Currency from '../../UI/Currency';
import Table from '../../UI/Table/Table';
import TdLink from '../../UI/Table/TdLink';

interface IProps {
  movies: IMovie[];
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

const MovieTable = ({ movies, setSearchParam }: IProps) => {
  return (
    <Table
      headers={[
        { name: 'UPDATED', type: 'date' },
        { name: 'MOVIE' },
        { name: 'RENTAL START', type: 'date' },
        { name: 'RENTAL END', type: 'date' },
        { name: 'PRICE', type: 'number' },
        { name: 'UPDATE', type: 'none' },
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

            <td
              onClick={() => setSearchParam(movie._id)}
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

export default MovieTable;
