import { useEffect, useState } from 'react';
import SeatsPage from './SeatsPage';
import { IBar, ISeat, IShowtime } from '../../Interfaces';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../UI/Loading';
import BuyMenu from './BuyMenu';
import ShowtimeInfo from './ShowtimeInfo';
import NavMenu from './NavMenu';
import Bar from './Bar';

const Showtime = () => {
  const { showtimeId } = useParams();
  const [showtime, setShowtime] = useState<IShowtime>();
  const [isSeatsPage, setIsSeatsPage] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([]);
  const [goods, setGoods] = useState<IBar[]>([]);

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

  useEffect(() => {
    if (!showtime) return;
    (async () => {
      try {
        const response = await axios.get(
          `/api/v1/bars?cinema=${showtime.hall.cinema._id}&sort=name`
        );
        setGoods(response.data.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [showtime]);

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
      else {
        const filteredSeats = prevState.filter(
          seat => seat.row !== row || seat.col !== col
        );
        if (filteredSeats.length === 0) setIsSeatsPage(true);
        return prevState.filter(seat => seat.row !== row || seat.col !== col);
      }
    });
  };

  if (!showtime) return <Loading />;
  return (
    <>
      <NavMenu
        selectedSeats={selectedSeats}
        isSeatsPage={isSeatsPage}
        setIsSeatsPage={setIsSeatsPage}
      />
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
            <Bar goods={goods} />
          )}
        </div>
        <div className='shrink-0 lg:w-[420px]'>
          <BuyMenu
            seats={selectedSeats}
            isSeatsPage={isSeatsPage}
            setIsSeatsPage={setIsSeatsPage}
            handleSelectSeat={handleSelectSeat}
          />
        </div>
      </div>
    </>
  );
};

export default Showtime;
