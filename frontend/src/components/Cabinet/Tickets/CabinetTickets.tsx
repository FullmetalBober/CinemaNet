import { useEffect, useState } from 'react';
import { ITicket } from '../../../Interfaces';
import axios from 'axios';
import TableTickets from './TableTickets';

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

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>YOUR TICKETS</h1>
      <TableTickets tickets={active} />
      <h2 className='mb-2 mt-2 text-2xl font-medium'>OLD</h2>
      <TableTickets tickets={old} />
    </div>
  );
};

export default CabinetTickets;
