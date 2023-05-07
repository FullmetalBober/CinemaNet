import { CinemaState } from '../../contexts/CinemaProvider';
import Map from './Map';

const BottomSchedule = () => {
  const { cinema } = CinemaState();

  return (
    <div className='rounded bg-white/5'>
      <h1 className='p-3 text-center text-4xl font-black'>How to find us</h1>
      <Map />
      <div className='p-4 text-center text-xl font-semibold'>
        {cinema.location.description}
      </div>
    </div>
  );
};

export default BottomSchedule;
