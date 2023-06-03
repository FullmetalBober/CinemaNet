import { IGenre, IMovie } from '../../Interfaces';
import InfoMovieCard from './InfoMovieCard';

interface IProps {
  movie: IMovie;
}

const InfoMovie = (props: IProps) => {
  const { movie } = props;
  if (!movie.ageRating) movie.ageRating = 0;

  return (
    <ul>
      {movie.ageRating > 0 && (
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
      {movie.genres?.length ? (
        <InfoMovieCard title='Genres'>
          {(movie.genres as IGenre[]).map(genre => genre.name).join(', ')}
        </InfoMovieCard>
      ) : null}
      <InfoMovieCard title='Duration'>
        {Math.floor(movie.duration / 60)}:{movie.duration % 60}
      </InfoMovieCard>

      {movie.productions?.length ? (
        <InfoMovieCard title='Production'>
          {movie.productions.join(', ')}
        </InfoMovieCard>
      ) : null}
      {movie.studios?.length ? (
        <InfoMovieCard title='Studio'>{movie.studios.join(', ')}</InfoMovieCard>
      ) : null}
      {movie.scenarios?.length ? (
        <InfoMovieCard title='Scenario'>
          {movie.scenarios.join(', ')}
        </InfoMovieCard>
      ) : null}
      {movie.starrings?.length ? (
        <InfoMovieCard title='Starring'>
          {movie.starrings.join(', ')}
        </InfoMovieCard>
      ) : null}
    </ul>
  );
};

export default InfoMovie;
