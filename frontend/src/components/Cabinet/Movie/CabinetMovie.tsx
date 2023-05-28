import { useEffect, useState } from 'react';
import ControlMenu from '../../UI/Control/ControlMenu';
import { IMovie } from '../../../Interfaces';
import MovieTable from './MovieTable';
import axios from 'axios';
import MovieAdd from './MovieAdd';

const buttons = ['View', 'Create'];
type Buttons = (typeof buttons)[number];

const CabinetMovie = () => {
  const [mode, setMode] = useState<Buttons>(buttons[0]);
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/v1/movies?sort=updatedAt');
        const data = response.data.data.data;
        setMovies(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>SHOWTIMES</h1>
      <ControlMenu buttons={buttons} mode={mode} setMode={setMode} />
      {mode === buttons[0] ? (
        <MovieTable movies={movies} />
      ) : (
        <MovieAdd setMovies={setMovies} setMode={setMode} buttons={buttons} />
      )}
    </div>
  );
};

export default CabinetMovie;
