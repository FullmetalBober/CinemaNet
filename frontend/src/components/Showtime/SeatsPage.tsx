import { IShowtime } from '../../Interfaces';
import ShowtimeInfo from './ShowtimeInfo';

interface IProps {
  showtime: IShowtime;
}

const SeatsPage = (props: IProps) => {
  const { showtime } = props;

  return (
    <div>
      <ShowtimeInfo showtime={showtime} />
    </div>
  );
};

export default SeatsPage;
