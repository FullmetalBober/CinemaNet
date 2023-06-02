import { useEffect, useState } from 'react';
import ControlMenu from '../../UI/Control/ControlMenu';
import { IMovie } from '../../../Interfaces';
import MovieTable from './MovieTable';
import MovieAdd from './MovieAdd';
import { useHttpClient } from '../../../hooks/http-hook';

const buttons = ['View', 'Create'];
type Buttons = (typeof buttons)[number];

const CabinetMovie = () => {
  const { sendRequest } = useHttpClient();
  const [mode, setMode] = useState<Buttons>(buttons[0]);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [searchParam, setSearchParam] = useState<string>('');

  useEffect(() => {
    if (searchParam !== '') {
      buttons[1] = 'Update';
      setMode(buttons[1]);
    } else buttons[1] = 'Create';
  }, [searchParam]);

  useEffect(() => {
    (async () => {
      const response = await sendRequest({
        url: '/api/v1/movies',
        params: {
          sort: 'updatedAt',
        },
        showErrMsg: true,
      });
      if (!response) return;
      setMovies(response.data.data.data);
    })();
  }, []);

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>SHOWTIMES</h1>
      <ControlMenu buttons={buttons} mode={mode} setMode={setMode} />
      {mode === buttons[0] ? (
        <MovieTable movies={movies} setSearchParam={setSearchParam} />
      ) : (
        <MovieAdd
          setMovies={setMovies}
          setMode={setMode}
          buttons={buttons}
          searchParam={searchParam}
          setSearchParam={setSearchParam}
        />
      )}
    </div>
  );
};

export default CabinetMovie;
