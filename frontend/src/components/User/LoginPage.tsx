import TextOpacity from '../UI/TextOpacity';

const LoginPage = () => {
  return (
    <>
      <h1 className='text-5xl font-bold'>Login to personal account</h1>
      <TextOpacity className='text-2xl'>
        All your orders and personal information are here
      </TextOpacity>
      <form className=''>
        <div className='relative'>
          <input
            type='text'
            id='name'
            className='peer w-[345px] border-b-2 border-white/50 bg-transparent px-2.5 pb-2.5 pt-4 text-xl text-slate-100 focus:border-red-500 focus:outline-none'
            placeholder=' '
            autoComplete='off'
          />
          <label
            htmlFor='name'
            className='absolute -top-2 left-0 px-2 text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-6 peer-focus:translate-y-0'
          >
            Name
          </label>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
