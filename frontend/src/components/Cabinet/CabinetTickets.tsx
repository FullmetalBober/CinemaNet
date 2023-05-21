import { useEffect, useState } from 'react';
import { ISeat, ITicket } from '../../Interfaces';
import axios from 'axios';
import Currency from '../UI/Currency';
import Table from '../UI/Table';

const CabinetTickets = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [active, setActive] = useState<ITicket[]>([]);
  const [old, setOld] = useState<ITicket[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/v1/tickets/my?booking=');
        setTickets(response.data.data.data);
        setTickets(prev =>
          prev.sort(
            (a, b) =>
              new Date(a.showtime.time.start).getTime() -
              new Date(b.showtime.time.start).getTime()
          )
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    setActive(
      tickets.filter(
        ticket => new Date(ticket.showtime.time.end).getTime() >= Date.now()
      )
    );
    setOld(
      tickets.filter(
        ticket => new Date(ticket.showtime.time.end).getTime() < Date.now()
      )
    );
  }, [tickets]);

  const unitSeatsByRow = (seats: ISeat[]) => {
    return seats.reduce((acc, seat) => {
      const row = acc.find(el => el[0].row === seat.row);
      if (row) row.push(seat);
      else acc.push([seat]);
      return acc;
    }, [] as ISeat[][]);
  };

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>YOUR TICKETS</h1>
      <Table
        headers={[
          'OPERATION',
          'MOVIE',
          'CINEMA',
          'HALL',
          'DATE',
          'TICKETS',
          'BAR - QTY',
          'COST',
        ]}
      >
        {active.map(ticket => (
          <tr key={ticket._id}>
            <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
            <td>{ticket.showtime.movie.name}</td>
            <td>{ticket.showtime.hall.cinema.name}</td>
            <td>{ticket.showtime.hall.name}</td>
            <td>
              {new Date(ticket.showtime.time.start).toLocaleString(undefined, {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </td>
            <td>
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
            <td>
              {ticket.barOrders.map((el, index) => (
                <p key={index}>
                  {el.bar.name} - {el.count}
                </p>
              ))}
            </td>
            <td>
              <Currency>{ticket.cost}</Currency>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default CabinetTickets;
