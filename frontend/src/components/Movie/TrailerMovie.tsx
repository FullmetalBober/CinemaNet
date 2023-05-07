import { FiChevronLeft } from 'react-icons/fi';
import { IMovie } from '../../Interfaces';
import { RiCloseFill } from 'react-icons/ri';

interface IProps {
  setShowTrailer: React.Dispatch<React.SetStateAction<boolean>>;
  movie: IMovie;
}

const TrailerMovie = (props: IProps) => {
  return (
    <div className='absolute top-0 z-10 flex h-full w-full flex-col'>
      <div className='flex w-full justify-between gap-3 bg-[#221f1f] p-3 px-7 text-2xl'>
        <div
          onClick={() => props.setShowTrailer(false)}
          className='flex cursor-pointer items-center gap-3 font-bold'
        >
          <FiChevronLeft className='rounded-full bg-white/25 text-3xl transition hover:bg-red-500' />
          {props.movie.name}
        </div>

        <div
          onClick={() => props.setShowTrailer(false)}
          className='flex cursor-pointer items-center gap-3 font-bold'
        >
          Close
          <RiCloseFill className='rounded-full bg-white/25 text-3xl transition hover:bg-red-500' />
        </div>
      </div>
      <iframe
        className='h-full w-full truncate'
        src={'https://www.youtube-nocookie.com/embed/DfE-4hij-sU'}
        title={props.movie.name}
        allowFullScreen
      />
    </div>
  );
};

export default TrailerMovie;
