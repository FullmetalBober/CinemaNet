import { AiOutlineInfoCircle } from 'react-icons/ai';
import { ICinema } from '../../../Interfaces';
import Table from '../../UI/Table/Table';

interface IProps {
  cinemas: ICinema[];
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

const CinemaTable = ({ cinemas, setSearchParam }: IProps) => {
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
        { name: 'UPDATE', type: 'none' },
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
            <td
              onClick={() => setSearchParam(cinema._id)}
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

export default CinemaTable;
