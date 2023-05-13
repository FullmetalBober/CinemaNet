import { Suspense, lazy } from 'react';
import { CinemaState } from '../../contexts/CinemaProvider';
import Loading from '../UI/Loading';
const Map = lazy(() => import('./Map'));

const BottomSchedule = () => {
  const { cinema } = CinemaState();

  return (
    <div className='rounded bg-white/5'>
      <h1 className='p-3 text-center text-4xl font-black'>How to find us</h1>
      {cinema.location.coordinates && (
        <Suspense fallback={<Loading />}>
          {' '}
          <Map />{' '}
        </Suspense>
      )}
      <div className='p-4 text-center text-xl font-semibold'>
        {cinema.location.description}
      </div>
    </div>
  );
};

export default BottomSchedule;
