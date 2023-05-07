import { IMovie } from '../../Interfaces';
import InfoMovie from './InfoMovie';
import AnotherMovies from './AnotherMovies';

interface IProps {
  movie: IMovie;
}

const CenterSideMovie = (props: IProps) => {
  const { movie } = props;

  return (
    <div className='px-10'>
      <h1 className='mb-4 text-5xl font-bold'>{movie.name}</h1>
      <InfoMovie movie={movie} />
      <p className='mb-5 mt-2 text-lg'>{movie.description}</p>
      <h1 className='mb-4 text-3xl font-medium'>See also:</h1>
      <AnotherMovies />
    </div>
  );
};

export default CenterSideMovie;
