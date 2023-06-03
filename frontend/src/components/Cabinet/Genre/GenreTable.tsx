import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IGenre } from '../../../Interfaces';
import Table from '../../UI/Table/Table';

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
        { name: 'MOVIES', type: 'number' },
        { name: 'UPDATE', type: 'none' },
      ]}
    >
      {genres.map(genre => {
        return (
          <tr key={genre._id}>
            <td data-order={new Date(genre.updatedAt || 0).getTime()}>
              {new Date(genre.updatedAt).toLocaleDateString()}
            </td>
            <td>{genre.name}</td>
            <td>{genre.moviesCount}</td>
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
