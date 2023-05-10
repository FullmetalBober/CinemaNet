import { Link } from 'react-router-dom';
import { CinemaState } from '../../contexts/CinemaProvider';
import ChooseCinema from '../Cinema/ChooseCinema';
import ArrowDown from '../UI/ArrowDown';
import { useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import Loading from '../UI/Loading';

const NavContent = () => {
  const [hoverChooseCinema, setHoverChooseCinema] = useState<boolean>(false);
  const [hoverSignIn, setHoverSignIn] = useState<boolean>(false);
  const { cinema } = CinemaState();
  return (
    <div className='block w-auto'>
      <div className='flex items-center justify-between divide-x-2 divide-white/30 text-lg font-semibold child:px-3'>
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
            <ArrowDown
              className={`${hoverChooseCinema ? '!bg-red-500' : ''}`}
            />
          </ChooseCinema>
        </div>
        <Link
          to='/auth'
          className='flex items-center gap-2'
          onMouseOver={() => setHoverSignIn(true)}
          onMouseOut={() => setHoverSignIn(false)}
        >
          Sign in
          <BsPersonFill
            className={`hover:bg-red-500' flex cursor-pointer items-center rounded-full bg-white/20 p-1 text-3xl ${
              hoverSignIn ? '!bg-red-500' : ''
            }`}
          />
        </Link>
      </div>
    </div>
  );
};

export default NavContent;
