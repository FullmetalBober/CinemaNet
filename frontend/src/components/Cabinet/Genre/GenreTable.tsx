import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IGenre } from '../../../Interfaces';
import Table from '../../UI/Table/Table';
import TdLink from '../../UI/Table/TdLink';

interface IProps {
  genres: IGenre[];
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

const GenreTable = ({ genres, setSearchParam }: IProps) => {
  return (
    <Table
      headers={[
        { name: 'UPDATED', type: 'date' },
        { name: 'GENRE' },
        { name: 'UPDATE', type: 'none' },
      ]}
    >
      {genres.map(genre => {
        const to = `/genre/${genre.slug}`;

        return (
          <tr key={genre._id}>
            <TdLink
              to={to}
              dataOrder={new Date(genre.updatedAt || 0).getTime()}
            >
              {new Date(genre.updatedAt).toLocaleDateString()}
            </TdLink>
            <TdLink to={to}>{genre.name}</TdLink>
            <td
              onClick={() => setSearchParam(genre._id)}
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

export default GenreTable;
