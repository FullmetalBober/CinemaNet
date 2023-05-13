import { useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { UserState } from '../../contexts/UserProvider';
import Loading from '../UI/Loading';

const AuthButton = () => {
  const [hoverSignIn, setHoverSignIn] = useState<boolean>(false);
  const { userLoading } = UserState();

  if (userLoading) return <Loading />;
  return (
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
  );
};

export default AuthButton;
