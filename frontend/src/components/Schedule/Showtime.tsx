import { Link } from 'react-router-dom';
import { IShowtime } from '../../Interfaces';

interface IProps {
  showtimes?: IShowtime[];
  className?: string;
}

const Showtime = (props: IProps) => {
  return (
    <div className={`grid grid-cols-3 gap-9 ${props.className}`}>
      {props.showtimes?.map(showtime => {
        return (
          <div key={showtime._id} className="flex">
            <Link to={showtime.movie.slug}>
              <div
                style={{ backgroundImage: `url(${showtime.movie.imageCover})` }}
                className="w-[140px] h-[224px] bg-cover bg-top rounded"
              />
            </Link>
            <div className="ml-4">
              <Link to={showtime.movie.slug}>
                <h1 className="font-bold text-xl">{showtime.movie.name}</h1>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Showtime;
