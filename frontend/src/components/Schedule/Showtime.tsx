import { Link } from 'react-router-dom';
import { IShowtime } from '../../Interfaces';
import { useEffect, useState } from 'react';
import Tooltip from '../UI/Tooltip';

interface IProps {
  showtimes?: IShowtime[];
  className?: string;
}

interface IShowtimeByMovie {
  movie: IShowtime['movie'];
  times: {
    _id: IShowtime['_id'];
    time: Date;
    price: number;
  }[];
}

const Showtime = (props: IProps) => {
  const [showtimesByMovie, setShowtimesByMovie] = useState<IShowtimeByMovie[]>(
    []
  );

  useEffect(() => {
    if (!props.showtimes) return;
    const showtimesFind = props.showtimes.reduce((acc, showtime) => {
      const index = acc.findIndex(
        item => item.movie._id === showtime.movie._id
      );
      if (index === -1) {
        acc.push({
          movie: showtime.movie,
          times: [
            {
              _id: showtime._id,
              time: showtime.time.start,
              price: showtime.price.standard,
            },
          ],
        });
      } else {
        acc[index].times.push({
          _id: showtime._id,
          time: showtime.time.start,
          price: showtime.price.standard,
        });
      }
      return acc;
    }, [] as IShowtimeByMovie[]);
    setShowtimesByMovie(showtimesFind);
  }, [props.showtimes]);

  return (
    <div className={`grid grid-cols-3 gap-9 ${props.className}`}>
      {showtimesByMovie.map(showtime => {
        let { movie, times } = showtime;

        times = times.sort(
          (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        );

        return (
          <div key={movie._id} className="flex">
            <Link to={`movie/${movie.slug}`}>
              <div
                style={{ backgroundImage: `url(${movie.imageCover})` }}
                className="h-[224px] w-[140px] rounded bg-cover bg-top"
              />
            </Link>
            <div className="ml-4">
              <Link to={movie.slug} className="mb-4">
                <h1 className="text-xl font-bold">{movie.name}</h1>
              </Link>
              <div className="flex flex-wrap gap-2">
                {times.map((time, index) => {
                  const date = new Date(time.time);
                  const hour = date.getHours();
                  const minute = date.getMinutes();
                  const hourString = hour < 10 ? `0${hour}` : `${hour}`;
                  const minuteString = minute < 10 ? `0${minute}` : `${minute}`;
                  return (
                    <Link
                      key={index}
                      to={`/showtime/${time._id}}`}
                      className="group relative mx-1 mb-3 flex flex-col items-center font-black text-red-500 hover:text-white"
                    >
                      <span>{`${hourString}:${minuteString}`}</span>
                      <Tooltip>from ${time.price}</Tooltip>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Showtime;
