import { ISeat, ITicket } from '../../Interfaces';
import Currency from '../UI/Currency';
import Table from '../UI/Table';

interface IProps {
  tickets: ITicket[];
}

const TableTickets = ({ tickets }: IProps) => {
  const unitSeatsByRow = (seats: ISeat[]) => {
    return seats.reduce((acc, seat) => {
      const row = acc.find(el => el[0].row === seat.row);
      if (row) row.push(seat);
      else acc.push([seat]);
      return acc;
    }, [] as ISeat[][]);
  };

  return (
    <Table
      headers={[
        { name: 'OPERATION', type: 'date' },
        { name: 'MOVIE' },
        { name: 'CINEMA' },
        { name: 'HALL' },
        { name: 'DATE', type: 'date' },
        { name: 'TICKETS', type: 'number' },
        { name: 'BAR - QTY', type: 'number' },
        { name: 'COST', type: 'number' },
      ]}
    >
      {tickets.map(ticket => (
        <tr key={ticket._id}>
          <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
          <td>{ticket.showtime.movie.name}</td>
          <td>{ticket.showtime.hall.cinema.name}</td>
          <td>{ticket.showtime.hall.name}</td>
          <td>
            {new Date(ticket.showtime.time.start).toLocaleString(undefined, {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </td>
          <td data-order={ticket.seats.length}>
            {unitSeatsByRow(ticket.seats).map((el, index) => (
              <p key={index}>
                row {el[0].row} - seat{' '}
                {el
                  .map(seat => seat.col)
                  .sort()
                  .join(',')}
              </p>
            ))}
          </td>
          <td
            data-order={ticket.barOrders.reduce((acc, el) => acc + el.count, 0)}
          >
            {ticket.barOrders.map((el, index) => (
              <p key={index}>
                {el.bar.name} - {el.count}
              </p>
            ))}
          </td>
          <td data-order={ticket.cost}>
            <Currency>{ticket.cost}</Currency>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default TableTickets;
