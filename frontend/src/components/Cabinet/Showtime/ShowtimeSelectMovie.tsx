import { useEffect } from 'react';
import { IMovie } from '../../../Interfaces';
import MovieSearch from '../Search/MovieSearch';
import MovieCard from '../../UI/Cards/MovieCard';

interface IProps {
  movie: IMovie;
  setMovie: React.Dispatch<React.SetStateAction<IMovie>>;
  inputHandler?: (id: string, value: string, isValid: boolean) => void;
}

const ShowtimeSelectMovie = (props: IProps) => {
  const { movie, setMovie } = props;

  useEffect(() => {
    let id = '';
    if (movie._id) id = movie._id;
    if (props.inputHandler) props.inputHandler('movie', id, !!movie._id);
  }, [movie]);

  return (
    <MovieSearch movie={movie} setMovie={setMovie}>
      <div className='cursor-pointer rounded transition hover:bg-white/5'>
        {movie._id ? (
          <div className='p-2'>
            <MovieCard movie={movie} />
          </div>
        ) : (
          <h1 className='bg-white/5 p-2 text-center text-4xl font-bold'>
            <span className='m-2'>Select movie</span>
          </h1>
        )}
      </div>
    </MovieSearch>
  );
};

export default ShowtimeSelectMovie;
