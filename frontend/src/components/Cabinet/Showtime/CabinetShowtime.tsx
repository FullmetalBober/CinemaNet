import { useEffect, useState } from 'react';
import ControlMenu from '../../UI/Control/ControlMenu';
import ShowtimeTable from './ShowtimeTable';
import { IShowtime } from '../../../Interfaces';
import { CinemaState } from '../../../contexts/CinemaProvider';
import axios from 'axios';
import ShowtimeAdd from './ShowtimeAdd';

const buttons = ['View', 'Create'];
type Buttons = (typeof buttons)[number];

const CabinetShowtime = () => {
  const { cinema } = CinemaState();
  const [mode, setMode] = useState<Buttons>(buttons[0]);
  const [showtimes, setShowtimes] = useState<IShowtime[]>([]);

  useEffect(() => {
    (async () => {
      try {
        if (!cinema.halls) return;
        const dateNow = new Date().setHours(0);
        const urls = cinema.halls.map(
          hall =>
            `/api/v1/showtimes?time.start[gte]=${dateNow}&hall=${hall._id}`
        );
        const response = await axios.all(urls.map(url => axios.get(url)));
        const data = response.map(res => res.data.data.data);
        const showtimes = data.flat();
        setShowtimes(showtimes);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [cinema.name, cinema.halls]);

  useEffect(() => {
    setShowtimes(prevState => [
      ...prevState.sort(
        (a, b) =>
          new Date(a.time.start).getTime() - new Date(b.time.start).getTime()
      ),
    ]);
  }, [showtimes]);

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>SHOWTIMES</h1>
      <ControlMenu buttons={buttons} mode={mode} setMode={setMode} />
      {mode === buttons[0] ? (
        <ShowtimeTable showtimes={showtimes} />
      ) : (
        <ShowtimeAdd
          showtimes={showtimes}
          setShowtimes={setShowtimes}
          setMode={setMode}
          buttons={buttons}
        />
      )}
    </div>
  );
};

export default CabinetShowtime;
