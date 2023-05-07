import { useEffect, useState } from 'react';
import SeatsPage from './SeatsPage';
import { ISeat, IShowtime } from '../../Interfaces';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../UI/Loading';
import BuyMenu from './BuyMenu';

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

  if (!showtime) return <Loading />;
  return (
    <div className="flex flex-wrap justify-between">
      <div className="flex-grow">
        {isSeatsPage ? <SeatsPage showtime={showtime} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} /> : <div>BAR</div>}
      </div>
      <div className="w-[511px]"><BuyMenu /></div>
    </div>
  );
};

export default Showtime;
