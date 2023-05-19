import CinemaButton from './CinemaButton';
import AuthButton from './AuthButton';
import { UserState } from '../../contexts/UserProvider';
import MeButton from './MeButton';
import { useLocation } from 'react-router-dom';

const NavContent = () => {
  const { user } = UserState();
  const { pathname } = useLocation();

  return (
    <div className='flex w-auto items-center justify-between divide-x-2 divide-white/30 text-lg font-semibold child:px-3'>
      <CinemaButton />
      {pathname === '/me' ? (
        <div id='nav-user-hook' />
      ) : user._id ? (
        <MeButton />
      ) : (
        <AuthButton />
      )}
    </div>
  );
};

export default NavContent;
