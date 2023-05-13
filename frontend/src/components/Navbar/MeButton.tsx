import { Link } from 'react-router-dom';
import { UserState } from '../../contexts/UserProvider';

const MeButton = () => {
  const { user } = UserState();

  return (
    <Link to='/me' className='flex items-center gap-2'>
      {user.name.split(' ')[0]}
      <img
        className='h-[30px] w-[30px] rounded-full'
        src={user.photo}
        alt={user.name}
      />
    </Link>
  );
};

export default MeButton;
