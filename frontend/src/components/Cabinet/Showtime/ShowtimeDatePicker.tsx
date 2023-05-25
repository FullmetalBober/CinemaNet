import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { IShowtime } from '../../../Interfaces';
import type { RangePickerProps } from 'antd/es/date-picker';

interface IProps {
  showtimes: IShowtime[];
  inputHandler: (id: string, value: string, isValid: boolean) => void;
}

const ShowtimeDatePicker = (props: IProps) => {
  const [value, setValue] = useState<Date>();
  const currentDayShowtimes = useMemo(() => {
    return props.showtimes.filter(showtime =>
      dayjs(showtime.time.start).isSame(dayjs(value), 'day')
    );
  }, [props.showtimes, value]);

  const onOk = () => {
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
    for (let i = 23; i >= 18; i--) {
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

    return [...hours, ...currentDayHours];
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
    return currentHourMinutes;
  };

  const disabledTime = () => {
    return {
      disabledHours: disabledHours,
      disabledMinutes: disabledMinutes,
    };
  };

  return (
    <div>
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
      />
    </div>
  );
};

export default ShowtimeDatePicker;
