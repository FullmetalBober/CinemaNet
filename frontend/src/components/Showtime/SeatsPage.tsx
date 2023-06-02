import { useMemo } from 'react';
import { ISeat, IShowtime } from '../../Interfaces';
import Seats from '../UI/Seats/Seats';
import GroupPriceCard from '../UI/Seats/GroupPrice';

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

  return (
    <div className='my-3 flex flex-col items-center'>
      <GroupPriceCard
        standardPrice={showtime.price.standard}
        luxPrice={showtime.price.lux}
      />
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
      <Seats
        hall={showtime.hall}
        occupiedSeats={showtime.tickets}
        selectedSeats={props.selectedSeats}
        handleSelectSeat={props.handleSelectSeat}
      />
    </div>
  );
};

export default SeatsPage;
