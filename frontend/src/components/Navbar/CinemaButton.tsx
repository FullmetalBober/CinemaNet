import { useState } from 'react';
import { CinemaState } from '../../contexts/CinemaProvider';
import ChooseCinema from '../Cinema/ChooseCinema';
import ArrowDown from '../UI/ArrowDown';
import Loading from '../UI/Loading';

const CinemaButton = () => {
  const [hoverChooseCinema, setHoverChooseCinema] = useState<boolean>(false);
  const { cinema } = CinemaState();

  return (
    <div
      onMouseOver={() => setHoverChooseCinema(true)}
      onMouseOut={() => setHoverChooseCinema(false)}
      onClick={() => setTimeout(() => setHoverChooseCinema(false), 500)}
      className='cursor-pointer'
    >
      <ChooseCinema className='flex items-center gap-2'>
        {cinema.name.length > 0 ? (
          `${cinema.location.city}, ${cinema.name}`
        ) : (
          <Loading />
        )}
        <ArrowDown className={`${hoverChooseCinema ? '!bg-red-500' : ''}`} />
      </ChooseCinema>
    </div>
  );
};

export default CinemaButton;
