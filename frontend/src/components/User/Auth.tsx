import AuthCoverSide from './AuthCoverSide';
import ControlAuthMenu from './ControlAuthMenu';
import LoginPage from './LoginPage';
import { useState } from 'react';
import RegistrationPage from './RegistrationPage';

const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <main className='flex h-[calc(100vh-61px)] justify-between bg-gradient-to-b from-white/10'>
      <div className='flex flex-1 flex-col items-center p-5'>
        <img
          width={190}
          height={110}
          src='/logo.png'
          alt='logo'
          loading='lazy'
        />
        <ControlAuthMenu
          isLoginPage={isLoginPage}
          setIsLoginPage={setIsLoginPage}
        />
        {isLoginPage ? <LoginPage /> : <RegistrationPage />}
      </div>
      <div className='m-auto hidden flex-[1.2] flex-col items-center text-center md:flex'>
        <AuthCoverSide />
      </div>
    </main>
  );
};

export default Auth;
