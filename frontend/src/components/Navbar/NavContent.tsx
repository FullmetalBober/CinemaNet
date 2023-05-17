import CinemaButton from './CinemaButton';
import AuthButton from './AuthButton';
import { UserState } from '../../contexts/UserProvider';
import MeButton from './MeButton';

const NavContent = () => {
  const { user } = UserState();

  return (
    <div className='block w-auto'>
      <div className='flex items-center justify-between divide-x-2 divide-white/30 text-lg font-semibold child:px-3'>
        <CinemaButton />
        {user._id ? <MeButton /> : <AuthButton />}
      </div>
    </div>
  );
};

export default NavContent;
