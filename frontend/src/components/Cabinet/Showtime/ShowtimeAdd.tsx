import { IShowtime } from '../../../Interfaces';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from '../../../hooks/form-hook';

interface IProps {
  showtimes: IShowtime[];
  setShowtimes: React.Dispatch<React.SetStateAction<IShowtime[]>>;
}

const ShowtimeAdd = (props: IProps) => {
  // const [formState, inputHandler, setFormData] = useForm(
  //   {
  //     date: {
  //       value: Date,
  //       isValid: false,
  //     },
  //   },
  //   false
  // );

  const [value, setValue] = useState<Date>();

  return (
    <form>
      <DatePicker
        id='date'
        onSelect={value => console.log(value)} //* This event the best for validation
        showTime={{ format: 'HH:mm' }}
        format='YYYY-MM-DD HH:mm'
        size='large'
        disabledDate={current =>
          current < dayjs().endOf('day').add(-1, 'day') ||
          current > dayjs().endOf('day').add(2, 'week')
        }
        disabledTime={() =>
          props.showtimes.length > 0
            ? {
                disabledHours: () =>
                  props.showtimes.map(showtime =>
                    dayjs(showtime.time.start).hour()
                  ),
                disabledMinutes: () =>
                  props.showtimes.map(showtime =>
                    dayjs(showtime.time.start).minute()
                  ),
              }
            : {}
        }
      />
    </form>
  );
};

export default ShowtimeAdd;
