import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { IMovie, IShowtime } from '../../../Interfaces';
import type { RangePickerProps } from 'antd/es/date-picker';
import { InputData } from '../../../hooks/form-hook';

interface IProps {
  movie: IMovie;
  showtimes: IShowtime[];
  formState: { inputs: InputData };
  inputHandler: (id: string, value: string, isValid: boolean) => void;
}

const ShowtimeDatePicker = (props: IProps) => {
  const [value, setValue] = useState<Date>();
  const currentHall = useMemo(() => {
    return props.showtimes.filter(
      showtime => props.formState.inputs.hall.value === showtime.hall._id
    );
  }, [props.showtimes, props.formState.inputs.hall.value]);

  const currentMovie = useMemo(() => {
    return currentHall.map(showtime => {
      return {
        ...showtime,
        time: {
          start: new Date(
            new Date(showtime.time.start).getTime() -
              props.movie.duration * 60 * 1000
          ),
          end: showtime.time.end,
        },
      };
    });
  }, [currentHall, props.movie.duration]);

  const currentDayShowtimes = useMemo(() => {
    return currentMovie.filter(showtime =>
      dayjs(showtime.time.start).isSame(dayjs(value), 'day')
    );
  }, [currentMovie, value]);

  const onOk = () => {
    if (disabledHours().length === 24) props.inputHandler('date', '', false);
    if (disabledMinutes().length === 60) props.inputHandler('date', '', false);
    console.log(disabledHours().length);
    props.inputHandler('date', dayjs(value).toISOString(), true);
  };

  const disabledDate: RangePickerProps['disabledDate'] = current => {
    return (
      current < dayjs().endOf('day').add(-1, 'day') ||
      current > dayjs().endOf('day').add(2, 'week')
    );
  };

  const disabledHours = () => {
    const hours = [];
    for (let i = 0; i <= 8; i++) {
      hours.push(i);
    }

    if (dayjs().isSame(dayjs(value), 'day'))
      for (let i = 0; i < dayjs().hour(); i++) hours.push(i);

    for (let i = 23; i >= 22 - props.movie.duration / 60; i--) {
      hours.push(i);
    }

    const currentDayHours = currentDayShowtimes.reduce((acc, showtime) => {
      const start = dayjs(showtime.time.start);
      const end = dayjs(showtime.time.end);
      if (start.minute() === 0) acc.push(start.hour());
      if (end.minute() === 0) acc.push(end.hour());
      for (let i = start.hour() + 1; i < end.hour(); i++) {
        acc.push(i);
      }

      return acc;
    }, [] as number[]);

    return [...new Set([...hours, ...currentDayHours])];
  };

  const disabledMinutes = () => {
    const currentHourMinutes = currentDayShowtimes.reduce((acc, showtime) => {
      if (!value) return acc;
      const start = dayjs(showtime.time.start);
      const end = dayjs(showtime.time.end);
      if (start.hour() === value.getHours())
        for (let i = start.minute(); i < 60; i++) acc.push(i);
      if (end.hour() === value.getHours())
        for (let i = 0; i <= end.minute(); i++) acc.push(i);

      return acc;
    }, [] as number[]);
    return [...new Set(currentHourMinutes)];
  };

  const disabledTime = () => {
    return {
      disabledHours: disabledHours,
      disabledMinutes: disabledMinutes,
    };
  };

  return (
    <DatePicker
      id='date'
      onOk={onOk}
      inputReadOnly={true}
      allowClear={false}
      onSelect={value => setValue(value.toDate())}
      showTime={{ format: 'HH:mm', hideDisabledOptions: true }}
      format='YYYY-MM-DD HH:mm'
      size='large'
      disabledDate={disabledDate}
      disabledTime={disabledTime}
      disabled={
        props.formState.inputs.hall.value === '' ||
        props.formState.inputs.movie.value === ''
      }
    />
  );
};

export default ShowtimeDatePicker;
