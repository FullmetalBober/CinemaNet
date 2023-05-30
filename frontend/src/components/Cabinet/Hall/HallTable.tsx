import { IHall } from '../../../Interfaces';
import Currency from '../../UI/Currency';
import Seats from '../../UI/Seats/Seats';
import Table from '../../UI/Table/Table';

interface IProps {
  halls: IHall[];
}

const HallTable = ({ halls }: IProps) => {
  const calculationSizeSeat = (hall: IHall) => {
    const maxCol = Math.max(...hall.seats.standard.map(seat => seat.seats));
    const width = 159 / maxCol;
    return {
      width: `${width}px`,
      height: `${width + width * 0.6}px`,
    };
  };

  return (
    <Table
      headers={[
        { name: 'UPDATED', type: 'date' },
        { name: 'HALL' },
        { name: 'PRICE STANDARD', type: 'number' },
        { name: 'PRICE LUX', type: 'number' },
        { name: 'SEATS', type: 'number' },
      ]}
    >
      {halls.map(hall => {
        return (
          <tr key={hall._id}>
            <td data-order={new Date(hall.updatedAt || 0).getTime()}>
              {new Date(hall.updatedAt).toLocaleDateString()}
            </td>
            <td>{hall.name}</td>
            <td data-order={hall.price.standard}>
              <Currency>{hall.price.standard}</Currency>
            </td>
            <td data-order={hall.price.lux}>
              <Currency>{hall.price.lux}</Currency>
            </td>
            <td
              data-order={
                hall.seats.standard.reduce((acc, row) => acc + row.seats, 0) +
                hall.seats.lux
              }
            >
              <Seats hall={hall} cardSize={calculationSizeSeat(hall)} />
            </td>
          </tr>
        );
      })}
    </Table>
  );
};

export default HallTable;
