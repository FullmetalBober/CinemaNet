import { IGenre } from '../../../Interfaces';
import Table from '../../UI/Table/Table';
import TdLink from '../../UI/Table/TdLink';

interface IProps {
  genres: IGenre[];
}

const GenreTable = ({ genres }: IProps) => {
  return (
    <Table headers={[{ name: 'UPDATED', type: 'date' }, { name: 'GENRE' }]}>
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
          </tr>
        );
      })}
    </Table>
  );
};

export default GenreTable;
