import { useEffect, useState } from 'react';
import ControlMenu from '../../UI/Control/ControlMenu';
import { IBar } from '../../../Interfaces';
import BarTable from './BarTable';
import BarAdd from './BarAdd';
import { CinemaState } from '../../../contexts/CinemaProvider';
import { useHttpClient } from '../../../hooks/http-hook';

const buttons = ['View', 'Create'];
type Buttons = (typeof buttons)[number];

const CabinetBar = () => {
  const { cinema } = CinemaState();
  const { sendRequest } = useHttpClient();
  const [mode, setMode] = useState<Buttons>(buttons[0]);
  const [bars, setBars] = useState<IBar[]>([]);
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
        url: `/api/v1/bars`,
        params: {
          cinema: cinema._id,
          sort: 'updatedAt',
        },
        showErrMsg: true,
      });

      if (response) setBars(response.data.data.data);
    })();
  }, [cinema._id]);

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>BARS</h1>
      <ControlMenu buttons={buttons} mode={mode} setMode={setMode} />
      {mode === buttons[0] ? (
        <BarTable bars={bars} setSearchParam={setSearchParam} />
      ) : (
        <BarAdd
          setBars={setBars}
          setMode={setMode}
          buttons={buttons}
          searchParam={searchParam}
          setSearchParam={setSearchParam}
        />
      )}
    </div>
  );
};

export default CabinetBar;
