import { IMovie } from '../../../Interfaces';

interface IProps {
  movie: IMovie;
  children?: React.ReactNode;
}

const MovieInfo = (props: IProps) => {
  return (
    <div className='mt-4 flex gap-5 px-4'>
      <img
        width={153}
        height={225}
        src={props.movie.imageCover}
        alt={props.movie.name}
        className='rounded'
      />
      <div>
        <h1 className='mb-3 text-3xl font-bold'>{props.movie.name}</h1>
        <div className='flex flex-wrap gap-2'>{props.children}</div>
      </div>
    </div>
  );
};

export default MovieInfo;
