import { RiCloseFill } from 'react-icons/ri';

const CardClose = ({ onClick }: { onClick: () => void }) => {
  return (
    <RiCloseFill
      onClick={onClick}
      className='ml-3 cursor-pointer rounded-full bg-[#e9e9e9] text-2xl text-black hover:bg-[#d9d9d9]'
    />
  );
};

export default CardClose;
