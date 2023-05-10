import TextOpacity from '../UI/TextOpacity';

const AuthCoverSide = () => {
  return (
    <>
      <img
        className='w-full max-w-[350px]'
        src='/images/bar/default.png'
        alt='popcorn'
        loading='lazy'
      />
      <h1 className='text-4xl font-semibold'>No need to download or print!</h1>
      <TextOpacity className='text-lg'>
        Tickets are already in your account - just log in now and show the QR
        code when entering the cinema hall.
      </TextOpacity>
    </>
  );
};

export default AuthCoverSide;
