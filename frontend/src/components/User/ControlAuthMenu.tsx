import ButtonAuthControl from './ButtonAuthControl';

interface IProps {
  isLoginPage: boolean;
  setIsLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlAuthMenu = ({ isLoginPage, setIsLoginPage }: IProps) => {
  return (
    <div className='flex justify-between divide-x-2 divide-white/30 child:px-4 my-4'>
      <ButtonAuthControl
        onClick={() => setIsLoginPage(true)}
        className={isLoginPage ? 'text-red-500' : ''}
      >
        Sign in
      </ButtonAuthControl>
      <ButtonAuthControl
        onClick={() => setIsLoginPage(false)}
        className={!isLoginPage ? 'text-red-500' : ''}
      >
        Sign up
      </ButtonAuthControl>
    </div>
  );
};

export default ControlAuthMenu;
