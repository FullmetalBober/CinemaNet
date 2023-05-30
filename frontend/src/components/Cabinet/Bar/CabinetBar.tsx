import { useEffect, useState } from 'react';
import ControlMenu from '../../UI/Control/ControlMenu';
import { IBar } from '../../../Interfaces';
import axios from 'axios';
import BarTable from './BarTable';
import BarAdd from './BarAdd';
import { CinemaState } from '../../../contexts/CinemaProvider';

const buttons = ['View', 'Create'];
type Buttons = (typeof buttons)[number];

const CabinetBar = () => {
  const { cinema } = CinemaState();
  const [mode, setMode] = useState<Buttons>(buttons[0]);
  const [bars, setBars] = useState<IBar[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `/api/v1/bars?sort=updatedAt&cinema=${cinema._id}`
        );
        const data = response.data.data.data;
        setBars(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>BARS</h1>
      <ControlMenu buttons={buttons} mode={mode} setMode={setMode} />
      {mode === buttons[0] ? (
        <BarTable bars={bars} />
      ) : (
        <BarAdd setBars={setBars} setMode={setMode} buttons={buttons} />
      )}
    </div>
  );
};

export default CabinetBar;
