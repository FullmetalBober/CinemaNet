import { HiOutlineClock } from 'react-icons/hi';
import { IMovie } from '../../../Interfaces';
import ShowtimeInfoCard from '../../Showtime/ShowtimeInfoCard';
import MovieInfo from '../Movie/MovieInfo';
import Currency from '../Currency';
import { MdPriceCheck } from 'react-icons/md';

interface IProps {
  movie: IMovie;
}

const MovieCard = (props: IProps) => {
  return (
    <MovieInfo movie={props.movie}>
      <ShowtimeInfoCard
        header='Duration'
        text={new Date(props.movie.duration * 1000 * 60)
          .toISOString()
          .slice(11, 16)}
        icon={<HiOutlineClock />}
      />
      <ShowtimeInfoCard
        header='Price'
        text={<Currency>{props.movie.price}</Currency>}
        icon={<MdPriceCheck />}
      />
    </MovieInfo>
  );
};

export default MovieCard;
