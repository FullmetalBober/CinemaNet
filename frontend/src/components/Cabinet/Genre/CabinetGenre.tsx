import { useEffect, useState } from 'react';
import ControlMenu from '../../UI/Control/ControlMenu';
import { IGenre } from '../../../Interfaces';
import axios from 'axios';
import GenreTable from './GenreTable';
import GenreAdd from './GenreAdd';

const buttons = ['View', 'Create'];
type Buttons = (typeof buttons)[number];

const CabinetGenre = () => {
  const [mode, setMode] = useState<Buttons>(buttons[0]);
  const [genres, setGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/v1/genres?sort=updatedAt');
        const data = response.data.data.data;
        setGenres(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>GENRES</h1>
      <ControlMenu buttons={buttons} mode={mode} setMode={setMode} />
      {mode === buttons[0] ? (
        <GenreTable genres={genres} />
      ) : (
        <GenreAdd setGenres={setGenres} setMode={setMode} buttons={buttons} />
      )}
    </div>
  );
};

export default CabinetGenre;
