import { useEffect, useState } from 'react';
import ControlMenu from '../../UI/Control/ControlMenu';
import { ICinema } from '../../../Interfaces';
import CinemaTable from './CinemaTable';
import CinemaAdd from './CinemaAdd';
import { useHttpClient } from '../../../hooks/http-hook';

const buttons = ['View', 'Create'];
type Buttons = (typeof buttons)[number];

const CabinetGenre = () => {
  const { sendRequest } = useHttpClient();
  const [mode, setMode] = useState<Buttons>(buttons[0]);
  const [cinemas, setCinemas] = useState<ICinema[]>([]);
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
        url: `/api/v1/cinemas`,
        params: {
          sort: 'updatedAt',
        },
        showErrMsg: true,
      });

      if (response) setCinemas(response.data.data.data);
    })();
  }, []);

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>CINEMA</h1>
      <ControlMenu buttons={buttons} mode={mode} setMode={setMode} />
      {mode === buttons[0] ? (
        <CinemaTable cinemas={cinemas} setSearchParam={setSearchParam} />
      ) : (
        <CinemaAdd
          setCinemas={setCinemas}
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
