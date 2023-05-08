import { useMemo } from 'react';
import { ISeat, IShowtime } from '../../Interfaces';
import ShowtimeMainPriceCard from './ShowtimeMainPriceCard';
import ShowtimeSeatCard from './ShowtimeSeatCard';
import { RiCloseFill } from 'react-icons/ri';
import Tooltip from '../UI/Tooltip';

interface IProps {
  showtime: IShowtime;
  selectedSeats: ISeat[];
  handleSelectSeat: (
    row: number,
    col: number,
    isLux: boolean,
    price: number
  ) => void;
}

const SeatsPage = (props: IProps) => {
  const { showtime } = props;
  const screenSize = useMemo(() => {
    const maxStandardSeats = Math.max(
      ...showtime.hall.seats.standard.map(row => row.seats)
    );
    const maxLuxSeats =
      showtime.hall.seats.lux + showtime.hall.seats.lux / 2 - 1;

    return Math.max(maxStandardSeats, maxLuxSeats);
  }, [showtime]);

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
        showtime.tickets.some(ticket =>
          ticket.seats.some(seat => seat.row === row && seat.col === col + 1)
        )
      )
        seats.push(
          <div key={col} className='group relative flex flex-col items-center'>
            <Tooltip side='bottom-full'>Is this seat taken</Tooltip>
            <ShowtimeSeatCard
              className={`${className} flex items-center justify-center bg-[#e4e4e4]/70 hover:opacity-50`}
            >
              <RiCloseFill className='text-black' />
            </ShowtimeSeatCard>
          </div>
        );
      else {
        if (
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
                Price: <small>$</small>
                {price}
              </p>
            </Tooltip>
            <ShowtimeSeatCard
              onClick={() => props.handleSelectSeat(row, col + 1, isLux, price)}
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
      if ((i + 1) % 2 === 0) newArray.push(<ShowtimeSeatCard key={i * -1} />);
    }

    return newArray;
  };

  return (
    <div className='my-3 flex flex-col items-center'>
      <div className='flex gap-14'>
        <ShowtimeMainPriceCard
          title='GOOD'
          price={showtime.price.standard}
          color='bg-[#95c7f4]'
        />
        <ShowtimeMainPriceCard
          title='SUPER LUX'
          price={showtime.price.lux}
          color='bg-red-500'
        />
      </div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 806 21'
        fill='white'
        className={`mt-4`}
        width={`${screenSize * 27}px`}
      >
        <path d='M3.2,20l-2,0.2l-0.3-4l2-0.2C136.2,5.3,269.6,0,403,0s266.8,5.3,400.2,16l2,0.2l-0.3,4l-2-0.2 C669.5,9.3,536.3,4,403,4S136.4,9.3,3.2,20z'></path>
      </svg>
      <div className='font-semibold'>SCREEN</div>
      <div className='mt-3 flex flex-col items-center gap-1'>
        {showtime.hall.seats.standard.map((row, index) => (
          <div key={index} className='flex gap-1.5'>
            {renderSeats(
              row.row,
              row.seats,
              false,
              showtime.price.standard,
              'bg-[#95c7f4] hover:!bg-[#95c7f4]/100',
              'border border-[#95c7f4] cursor-pointer hover:bg-[#95c7f4]/50 transition'
            )}
          </div>
        ))}
        <div className='mt-2 flex gap-1.5'>
          {AddEmptySeats(
            renderSeats(
              showtime.hall.seats.standard.length + 1,
              showtime.hall.seats.lux,
              true,
              showtime.price.lux,
              'bg-red-500 hover:!bg-red-500/100',
              'border border-red-500 cursor-pointer transition hover:bg-red-500/50'
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatsPage;
