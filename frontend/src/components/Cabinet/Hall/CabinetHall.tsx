import { useEffect, useState } from 'react';
import ControlMenu from '../../UI/Control/ControlMenu';
import { IHall } from '../../../Interfaces';
import HallTable from './HallTable';
import HallAdd from './HallAdd';
import { CinemaState } from '../../../contexts/CinemaProvider';
import { useHttpClient } from '../../../hooks/http-hook';

const buttons = ['View', 'Create'];
type Buttons = (typeof buttons)[number];

const CabinetHall = () => {
  const { sendRequest } = useHttpClient();
  const { cinema } = CinemaState();
  const [mode, setMode] = useState<Buttons>(buttons[0]);
  const [halls, setHalls] = useState<IHall[]>([]);
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
        url: '/api/v1/halls',
        params: {
          sort: 'updatedAt',
          cinema: cinema._id,
        },
        showErrMsg: true,
      });

      if (!response) return;
      setHalls(response.data.data.data);
    })();
  }, [cinema._id]);

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>HALLS</h1>
      <ControlMenu buttons={buttons} mode={mode} setMode={setMode} />
      {mode === buttons[0] ? (
        <HallTable halls={halls} setSearchParam={setSearchParam} />
      ) : (
        <HallAdd
          setHalls={setHalls}
          setMode={setMode}
          buttons={buttons}
          searchParam={searchParam}
          setSearchParam={setSearchParam}
        />
      )}
    </div>
  );
};

export default CabinetHall;
