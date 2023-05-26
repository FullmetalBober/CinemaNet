import { IShowtime } from '../../Interfaces';
import ShowtimeInfoCard from './ShowtimeInfoCard';
import { GoLocation } from 'react-icons/go';
import { RxCalendar } from 'react-icons/rx';
import { HiOutlineClock } from 'react-icons/hi2';
import MovieInfo from '../UI/Movie/MovieInfo';

interface IProps {
  showtime: IShowtime;
  className?: string;
}

const ShowtimeInfo = (props: IProps) => {
  const { showtime } = props;

  return (
    <MovieInfo movie={showtime.movie}>
      <ShowtimeInfoCard
        header={`Hall №${showtime.hall.name}`}
        text={`${showtime.hall.cinema.location.city}, ${showtime.hall.cinema.name}`}
        icon={<GoLocation />}
      />
      <ShowtimeInfoCard
        header={new Date(showtime.time.start).toLocaleDateString('uk-UA')}
        text={new Date(showtime.time.start).toLocaleDateString('en-GB', {
          weekday: 'long',
        })}
        icon={<RxCalendar />}
      />
      <ShowtimeInfoCard
        header='Time'
        text={`${new Date(showtime.time.start).toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        })} - ${new Date(showtime.time.end).toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        })}`}
        icon={<HiOutlineClock />}
      />
    </MovieInfo>
  );
};

export default ShowtimeInfo;
