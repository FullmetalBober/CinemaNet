import AuthCoverSide from './AuthCoverSide';
import ControlAuthMenu from './ControlAuthMenu';
import LoginMode from './LoginMode';
import { useEffect, useState } from 'react';
import RegistrationMode from './RegistrationMode';
import { useForm } from '../../hooks/form-hook';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    if (isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          email: {
            value: '',
            isValid: false,
          },
          password: {
            value: '',
            isValid: false,
          },
        },
        formState.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
          email: {
            value: '',
            isValid: false,
          },
          password: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
  }, [isLoginMode]);

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
          isLoginMode={isLoginMode}
          setIsLoginMode={setIsLoginMode}
        />
        {isLoginMode ? (
          <LoginMode inputHandler={inputHandler} formState={formState} />
        ) : (
          <RegistrationMode inputHandler={inputHandler} formState={formState} />
        )}
      </div>
      <div className='m-auto hidden flex-[1.2] flex-col items-center text-center md:flex'>
        <AuthCoverSide />
      </div>
    </main>
  );
};

export default Auth;
