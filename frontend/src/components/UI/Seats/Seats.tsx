import { IHall, ISeat, ITicket } from '../../../Interfaces';
import ShowtimeSeatCard from './ShowtimeSeatCard';
import { RiCloseFill } from 'react-icons/ri';
import Currency from '../Currency';
import Tooltip from '../Tooltip';

interface IProps {
  hall: IHall;
  occupiedSeats?: ITicket[];
  selectedSeats?: ISeat[];
  handleSelectSeat?: (
    row: number,
    col: number,
    isLux: boolean,
    price: number
  ) => void;
  cardSize?: {
    width: string;
    height: string;
  };
}

const Seats = (props: IProps) => {
  const renderSeats = (
    row: number,
    cols: number,
    isLux: boolean,
    price: number,
    color: string,
    className?: string
  ) => {
    const seats = [];
    for (let col = 0; col < cols; col++) {
      let colorNow = 'bg-transparent';
      if (
        props.occupiedSeats &&
        props.occupiedSeats.some(ticket =>
          ticket.seats.some(seat => seat.row === row && seat.col === col + 1)
        )
      )
        seats.push(
          <div key={col} className='group relative flex flex-col items-center'>
            <Tooltip side='bottom-full'>Is this seat taken</Tooltip>
            <ShowtimeSeatCard
              cardSize={props.cardSize}
              className={`${className} flex items-center justify-center bg-[#e4e4e4]/70 hover:opacity-50`}
            >
              <RiCloseFill className='text-black' />
            </ShowtimeSeatCard>
          </div>
        );
      else {
        if (
          props.selectedSeats &&
          props.selectedSeats.some(
            seat => seat.row === row && seat.col === col + 1
          )
        )
          colorNow = color;
        seats.push(
          <div key={col} className='group relative flex flex-col items-center'>
            <Tooltip side='bottom-full'>
              <p>
                {row} Row, {col + 1} Seat
              </p>
              <p>
                Price: <Currency>{price}</Currency>
              </p>
            </Tooltip>
            <ShowtimeSeatCard
              cardSize={props.cardSize}
              onClick={() =>
                props.handleSelectSeat &&
                props.handleSelectSeat(row, col + 1, isLux, price)
              }
              className={`${className} ${colorNow}`}
            />
          </div>
        );
      }
    }
    return seats;
  };

  const AddEmptySeats = (seats: React.ReactNode[]) => {
    let newArray = [];

    for (let i = 0; i < seats.length; i++) {
      newArray.push(seats[i]);
      if (i === seats.length - 1) break;
      if ((i + 1) % 2 === 0)
        newArray.push(
          <ShowtimeSeatCard key={i * -1} cardSize={props.cardSize} />
        );
    }

    return newArray;
  };

  return (
    <div className='mt-3 flex flex-col items-center gap-1'>
      {props.hall.seats.standard.map((row, index) => (
        <div key={index} className='flex gap-1.5'>
          {renderSeats(
            row.row,
            row.seats,
            false,
            props.hall.price.standard,
            'bg-[#95c7f4] hover:!bg-[#95c7f4]/100',
            'border border-[#95c7f4] cursor-pointer hover:bg-[#95c7f4]/50 transition'
          )}
        </div>
      ))}
      <div className='mt-2 flex gap-1.5'>
        {AddEmptySeats(
          renderSeats(
            props.hall.seats.standard.length + 1,
            props.hall.seats.lux,
            true,
            props.hall.price.lux,
            'bg-red-500 hover:!bg-red-500/100',
            'border border-red-500 cursor-pointer transition hover:bg-red-500/50'
          )
        )}
      </div>
    </div>
  );
};

export default Seats;
