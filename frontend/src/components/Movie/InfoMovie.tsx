import { Link } from 'react-router-dom';
import { IMovie } from '../../Interfaces';
import InfoMovieCard from './InfoMovieCard';

interface IProps {
  movie: IMovie;
}

const InfoMovie = (props: IProps) => {
  const { movie } = props;

  return (
    <ul>
      {movie.ageRating && (
        <InfoMovieCard title='Age'>{movie.ageRating}+</InfoMovieCard>
      )}
      {movie.releaseYear && (
        <InfoMovieCard title='Release year'>{movie.releaseYear}</InfoMovieCard>
      )}
      {movie.originalName && (
        <InfoMovieCard title='Original name'>
          {movie.originalName}
        </InfoMovieCard>
      )}
      {movie.director && (
        <InfoMovieCard title='Director'>{movie.director}</InfoMovieCard>
      )}
      {movie.rentalPeriod && (
        <InfoMovieCard title='Rental period'>
          {' '}
          {new Date(movie.rentalPeriod.start).toLocaleDateString('uk-UA')}
          {' - '}
          {new Date(movie.rentalPeriod.end).toLocaleDateString('uk-UA')}
        </InfoMovieCard>
      )}
      {movie.language && (
        <InfoMovieCard title='Language'>{movie.language}</InfoMovieCard>
      )}
      {movie.genres && (
        <InfoMovieCard classNameSecond='!text-white' title='Genres'>
          {' '}
          {movie.genres.map((genre, index) => {
            if (typeof genre === 'string') return null;
            return (
              <Link key={genre._id} to={`/genre/${genre.slug}`}>
                <span className='border-b'>{genre.name}</span>
                {movie.genres && index !== movie.genres.length - 1 && ', '}
              </Link>
            );
          })}
        </InfoMovieCard>
      )}
      <InfoMovieCard title='Duration'>
        {Math.floor(movie.duration / 60)}:{movie.duration % 60}
      </InfoMovieCard>

      {movie.productions && (
        <InfoMovieCard title='Production'>{movie.productions}</InfoMovieCard>
      )}
      {movie.studios && (
        <InfoMovieCard title='Studio'>{movie.studios.join(', ')}</InfoMovieCard>
      )}
      {movie.scenarios && (
        <InfoMovieCard title='Scenario'>
          {movie.scenarios.join(', ')}
        </InfoMovieCard>
      )}
      {movie.starrings && (
        <InfoMovieCard title='Starring'>
          {movie.starrings.join(', ')}
        </InfoMovieCard>
      )}
    </ul>
  );
};

export default InfoMovie;
