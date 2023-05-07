import { useEffect, useState } from 'react';
import SeatsPage from './SeatsPage';
import { ISeat, IShowtime } from '../../Interfaces';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../UI/Loading';
import BuyMenu from './BuyMenu';
import ShowtimeInfo from './ShowtimeInfo';

const Showtime = () => {
  const { showtimeId } = useParams();
  const [showtime, setShowtime] = useState<IShowtime>();
  const [isSeatsPage, setIsSeatsPage] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/v1/showtimes/${showtimeId}`);
        setShowtime(response.data.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [showtimeId]);

  const handleSelectSeat = (
    row: number,
    col: number,
    isLux: boolean,
    price: number
  ) => {
    setSelectedSeats(prevState => {
      const index = prevState.findIndex(
        seat => seat.row === row && seat.col === col
      );
      if (index === -1) return [...prevState, { row, col, isLux, price }];
      else
        return prevState.filter(seat => seat.row !== row || seat.col !== col);
    });
  };

  if (!showtime) return <Loading />;
  return (
    <div className='m-3 flex flex-col justify-between lg:flex-row'>
      <div className='flex-grow'>
        <ShowtimeInfo showtime={showtime} />
        {isSeatsPage ? (
          <SeatsPage
            showtime={showtime}
            selectedSeats={selectedSeats}
            handleSelectSeat={handleSelectSeat}
          />
        ) : (
          <div>BAR</div>
        )}
      </div>
      <div className='lg:w-[445px]'>
        <BuyMenu
          seats={selectedSeats}
          isSeatsPage={isSeatsPage}
          setIsSeatsPage={setIsSeatsPage}
          handleSelectSeat={handleSelectSeat}
        />
      </div>
    </div>
  );
};

export default Showtime;
