import { useEffect, useState } from 'react';
import { IHall } from '../../../Interfaces';
import HallSearch from '../Search/HallSearch';
import Seats from '../../UI/Seats/Seats';

interface IProps {
  hall: IHall;
  setHall: React.Dispatch<React.SetStateAction<IHall>>;
  inputHandler?: (id: string, value: string, isValid: boolean) => void;
}

const ShowtimeSelectHall = (props: IProps) => {
  const { hall, setHall } = props;

  useEffect(() => {
    let id = '';
    if (hall._id) id = hall._id;
    if (props.inputHandler) props.inputHandler('hall', id, !!hall._id);
  }, [hall]);

  return (
    <HallSearch hall={hall} setHall={setHall}>
      <div className='cursor-pointer rounded transition hover:bg-white/5'>
        {hall._id ? (
          <div className='p-2'>
            <h2 className='text-center text-2xl font-bold'>{hall.name}</h2>
            <Seats hall={hall} />
          </div>
        ) : (
          <h1 className='bg-white/5 p-2 text-center text-4xl font-bold'>
            <span className='m-2'>Select hall</span>
          </h1>
        )}
      </div>
    </HallSearch>
  );
};

export default ShowtimeSelectHall;
