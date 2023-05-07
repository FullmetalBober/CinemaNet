import Circle from '../UI/Circle';
import TextOpacity from '../UI/TextOpacity';
import { IoLocationOutline } from 'react-icons/io5';
import { HiOutlinePhone } from 'react-icons/hi';
import { CinemaState } from '../../contexts/CinemaProvider';
import Loading from '../UI/Loading';

const ImageCover = () => {
  const { cinema } = CinemaState();

  if (!cinema.imageCover) return <Loading />;
  return (
    <div
      style={{ backgroundImage: `url(${cinema.imageCover})` }}
      className='bg-cover bg-center'
    >
      <div style={{ backgroundImage: "url('images/cinema/tv.png')" }}>
        <div className='pt-[10rem]'>
          <h1 className='text-center text-6xl font-extrabold'>{cinema.name}</h1>
          <div className='mt-5 flex justify-between'>
            <div className='flex items-center justify-center p-8'>
              <Circle className='mr-4'>
                <IoLocationOutline color='white' size={27} />
              </Circle>
              <div>
                <p className='text-2xl font-bold'>{cinema.location.address}</p>
                <TextOpacity>{cinema.location.city}</TextOpacity>
              </div>
            </div>
            <div className='flex items-center p-8'>
              <TextOpacity>Contact center</TextOpacity>
              <Circle className='ml-4'>
                <HiOutlinePhone color='white' size={27} />
              </Circle>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCover;
