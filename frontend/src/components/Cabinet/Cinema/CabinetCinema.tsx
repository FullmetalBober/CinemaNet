import { useEffect, useState } from 'react';
import ControlMenu from '../../UI/Control/ControlMenu';
import { ICinema } from '../../../Interfaces';
import axios from 'axios';
import CinemaTable from './CinemaTable';
import CinemaAdd from './CinemaAdd';

const buttons = ['View', 'Create'];
type Buttons = (typeof buttons)[number];

const CabinetGenre = () => {
  const [mode, setMode] = useState<Buttons>(buttons[0]);
  const [cinemas, setCinemas] = useState<ICinema[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/v1/cinemas?sort=updatedAt');
        const data = response.data.data.data;
        setCinemas(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>CINEMA</h1>
      <ControlMenu buttons={buttons} mode={mode} setMode={setMode} />
      {mode === buttons[0] ? (
        <CinemaTable cinemas={cinemas} />
      ) : (
        <CinemaAdd setCinemas={setCinemas} setMode={setMode} buttons={buttons} />
      )}
    </div>
  );
};

export default CabinetGenre;
