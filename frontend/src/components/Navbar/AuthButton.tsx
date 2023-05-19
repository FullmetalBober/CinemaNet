import { useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { UserState } from '../../contexts/UserProvider';
import Loading from '../UI/Loading';

const AuthButton = () => {
  const { userLoading } = UserState();

  if (userLoading) return <Loading />;
  return (
    <Link to='/auth' className='group flex items-center gap-2'>
      Sign in
      <BsPersonFill
        className={`flex cursor-pointer items-center rounded-full bg-white/20 p-1 text-3xl transition group-hover:bg-red-500`}
      />
    </Link>
  );
};

export default AuthButton;
