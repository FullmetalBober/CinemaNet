import { useEffect, useState } from 'react';
import { IShowtime } from '../../Interfaces';
import { CinemaState } from '../../contexts/CinemaProvider';
import ImageCover from './ImageCover';
import axios from 'axios';
import DatesSchedule from './DatesSchedule';
import ShowtimeSchedule from './ShowtimeSchedule';
import HorizontalLine from '../UI/HorizontalLine';
import { BsHandIndex } from 'react-icons/bs';
import Footer from './Footer';
import BottomSchedule from './BottomSchedule';

const Schedule = () => {
  const [showtimes, setShowtimes] = useState<IShowtime[]>([]);
  const [showtimesSelectedDay, setShowtimesSelectedDay] =
    useState<IShowtime[]>();
  const [days, setDays] = useState<Date[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const { cinema } = CinemaState();

  useEffect(() => {
    (async () => {
      try {
        if (!cinema.halls) return;
        const dateNow = new Date();
        const urls = cinema.halls.map(
          hall =>
            `/api/v1/showtimes?time.start[gte]=${dateNow}&hall=${hall._id}`
        );
        const response = await axios.all(urls.map(url => axios.get(url)));
        const data = response.map(res => res.data.data.data);
        const showtimes = data.flat();
        setShowtimes(showtimes);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [cinema]);

  useEffect(() => {
    if (!showtimes) return;
    const days = showtimes.map(showtime => {
      const date = new Date(showtime.time.start);
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0
      ).getTime();
    });
    const uniqueDays = [...new Set(days)].map(day => new Date(day));
    setDays(uniqueDays);
    if (uniqueDays) setSelectedDay(uniqueDays[0]);
  }, [showtimes]);

  useEffect(() => {
    if (!showtimes || !selectedDay) return;
    const showtimesSelectedDay = showtimes.filter(showtime => {
      const date = new Date(showtime.time.start);
      return (
        date.getFullYear() === selectedDay.getFullYear() &&
        date.getMonth() === selectedDay.getMonth() &&
        date.getDate() === selectedDay.getDate()
      );
    });
    setShowtimesSelectedDay(showtimesSelectedDay);
  }, [showtimes, selectedDay]);

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
  };

  return (
    <>
      <div className="mx-auto mb-7 mt-7 flex flex-col gap-4 lg:max-w-screen-xl lg:px-9">
        <ImageCover />
        <DatesSchedule
          days={days}
          selectedDay={selectedDay}
          handleDayClick={handleDayClick}
          className="mb-5"
        />
        <HorizontalLine className="flex">
          <BsHandIndex size={23} className="mr-3" />
          Click on a session time to select seats
        </HorizontalLine>
        <ShowtimeSchedule
          className="mb-3 mt-5"
          showtimes={showtimesSelectedDay}
        />
        <BottomSchedule />
      </div>
      <Footer />
    </>
  );
};

export default Schedule;
