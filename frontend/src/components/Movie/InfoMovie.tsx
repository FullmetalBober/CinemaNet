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
        <InfoMovieCard title="Age">{movie.ageRating}+</InfoMovieCard>
      )}
      {movie.releaseYear && (
        <InfoMovieCard title="Release year">{movie.releaseYear}</InfoMovieCard>
      )}
      {movie.originalName && (
        <InfoMovieCard title="Original name">
          {movie.originalName}
        </InfoMovieCard>
      )}
      {movie.director && (
        <InfoMovieCard title="Director">{movie.director}</InfoMovieCard>
      )}
      {movie.rentalPeriod && (
        <InfoMovieCard title="Rental period">
          {' '}
          {new Date(movie.rentalPeriod.start).toLocaleDateString('uk-UA')}
          {' - '}
          {new Date(movie.rentalPeriod.end).toLocaleDateString('uk-UA')}
        </InfoMovieCard>
      )}
      {movie.language && (
        <InfoMovieCard title="Language">{movie.language}</InfoMovieCard>
      )}
      {movie.genres && (
        <InfoMovieCard classNameSecond="!text-white" title="Genres">
          {' '}
          {movie.genres.map((genre, index) => {
            if (typeof genre === 'string') return null;
            return (
              <Link key={genre._id} to={`/genre/${genre.slug}`}>
                <span className="border-b">{genre.name}</span>
                {movie.genres && index !== movie.genres.length - 1 && ', '}
              </Link>
            );
          })}
        </InfoMovieCard>
      )}
      <InfoMovieCard title="Duration">
        {Math.floor(movie.duration / 60)}:{movie.duration % 60}
      </InfoMovieCard>

      {movie.production && (
        <InfoMovieCard title="Production">{movie.production}</InfoMovieCard>
      )}
      {movie.studio && (
        <InfoMovieCard title="Studio">{movie.studio.join(', ')}</InfoMovieCard>
      )}
      {movie.scenario && (
        <InfoMovieCard title="Scenario">
          {movie.scenario.join(', ')}
        </InfoMovieCard>
      )}
      {movie.starring && (
        <InfoMovieCard title="Starring">
          {movie.starring.join(', ')}
        </InfoMovieCard>
      )}
    </ul>
  );
};

export default InfoMovie;
