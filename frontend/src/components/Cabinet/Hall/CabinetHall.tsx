import { useEffect, useState } from 'react';
import ControlMenu from '../../UI/Control/ControlMenu';
import { IHall } from '../../../Interfaces';
import axios from 'axios';
import HallTable from './HallTable';
import HallAdd from './HallAdd';
import { CinemaState } from '../../../contexts/CinemaProvider';

const buttons = ['View', 'Create'];
type Buttons = (typeof buttons)[number];

const CabinetHall = () => {
  const { cinema } = CinemaState();
  const [mode, setMode] = useState<Buttons>(buttons[0]);
  const [halls, setHalls] = useState<IHall[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `/api/v1/halls?sort=updatedAt&cinema=${cinema._id}`
        );
        const data = response.data.data.data;
        setHalls(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>HALLS</h1>
      <ControlMenu buttons={buttons} mode={mode} setMode={setMode} />
      {mode === buttons[0] ? (
        <HallTable halls={halls} />
      ) : (
        <HallAdd setHalls={setHalls} setMode={setMode} buttons={buttons} />
      )}
    </div>
  );
};

export default CabinetHall;
