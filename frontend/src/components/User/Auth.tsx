import AuthCover from './AuthCover';

const Auth = () => {
  return (
    <main className='flex h-[calc(100vh-61px)] justify-between bg-gradient-to-b from-white/10'>
      <div className='flex-1'>Login</div>
      <div className='m-auto hidden flex-[1.2] flex-col items-center text-center md:flex'>
        <AuthCover />
      </div>
    </main>
  );
};

export default Auth;
