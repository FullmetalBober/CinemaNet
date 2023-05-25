import { useState } from 'react';
import { IHall } from '../../../Interfaces';
import HallSearch from '../HallSearch';

const ShowtimeSelectHall = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [hall, setHall] = useState<IHall>({} as IHall);

  return (
    <div
      className='cursor-pointer rounded transition hover:bg-white/10'
      onClick={() => setShowSearch(true)}
    >
      {hall._id ? (
        ''
      ) : (
        <HallSearch hall={hall} setHall={setHall}>
          <h1 className='bg-white/5 p-2 text-4xl font-bold'>
            <span className='m-2'>Select hall</span>
          </h1>
        </HallSearch>
      )}
    </div>
  );
};

export default ShowtimeSelectHall;
