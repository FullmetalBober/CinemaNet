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
  const [searchParam, setSearchParam] = useState<string>('');

  useEffect(() => {
    if (searchParam !== '') {
      buttons[1] = 'Update';
      setMode(buttons[1]);
    } else buttons[1] = 'Create';
  }, [searchParam]);

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
        <GenreTable genres={genres} setSearchParam={setSearchParam} />
      ) : (
        <GenreAdd
          setGenres={setGenres}
          setMode={setMode}
          buttons={buttons}
          searchParam={searchParam}
          setSearchParam={setSearchParam}
        />
      )}
    </div>
  );
};

export default CabinetGenre;
