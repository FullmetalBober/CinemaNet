import { CinemaState } from '../../contexts/CinemaProvider';
import Loading from '../UI/Loading';
import ImageCover from './ImageCover';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const { cinema } = CinemaState();

  if (!cinema.imageCover) return <Loading />;
  return (
    <div className="lg:max-w-screen-xl lg:px-9 mx-auto mt-7">
      <ImageCover/>

    </div>
  );
};

export default Schedule;
