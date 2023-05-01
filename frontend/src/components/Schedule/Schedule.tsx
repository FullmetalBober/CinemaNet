import { useEffect, useState } from 'react';
import { IShowtime } from '../../Interfaces';
import { CinemaState } from '../../contexts/CinemaProvider';
import Loading from '../UI/Loading';
import ImageCover from './ImageCover';
import axios from 'axios';

const Schedule = () => {
  const [showtime, setShowtime] = useState<IShowtime[]>([]);
  const { cinema } = CinemaState();

  useEffect(() => {
    //date now
    const date = new Date();
    (async () => {
      try {
        const response = await axios.get(
          `/api/v1/showtimes?time.start[gte]=${date}`
        );
        console.log(response.data.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!cinema.imageCover) return <Loading />;
  return (
    <div className="lg:max-w-screen-xl lg:px-9 mx-auto mt-7">
      <ImageCover />
    </div>
  );
};

export default Schedule;
