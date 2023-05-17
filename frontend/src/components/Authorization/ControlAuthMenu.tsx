import ButtonAuthControl from './ButtonAuthControl';

interface IProps {
  isLoginMode: boolean;
  setIsLoginMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlAuthMenu = ({ isLoginMode: isLoginMode, setIsLoginMode: setIsLoginMode }: IProps) => {
  return (
    <div className='flex justify-between divide-x-2 divide-white/30 child:px-4 my-4'>
      <ButtonAuthControl
        onClick={() => setIsLoginMode(true)}
        className={isLoginMode ? 'text-red-500' : ''}
      >
        Sign in
      </ButtonAuthControl>
      <ButtonAuthControl
        onClick={() => setIsLoginMode(false)}
        className={!isLoginMode ? 'text-red-500' : ''}
      >
        Sign up
      </ButtonAuthControl>
    </div>
  );
};

export default ControlAuthMenu;
