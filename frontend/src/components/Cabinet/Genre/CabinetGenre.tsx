import { useEffect, useState } from 'react';
import ControlMenu from '../../UI/Control/ControlMenu';
import { IGenre } from '../../../Interfaces';
import GenreTable from './GenreTable';
import GenreAdd from './GenreAdd';
import { useHttpClient } from '../../../hooks/http-hook';

const buttons = ['View', 'Create'];
type Buttons = (typeof buttons)[number];

const CabinetGenre = () => {
  const { sendRequest } = useHttpClient();
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
      const response = await sendRequest({
        url: `/api/v1/genres`,
        params: {
          sort: 'updatedAt',
        },
        showErrMsg: true,
      });

      if (response) setGenres(response.data.data.data);
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
