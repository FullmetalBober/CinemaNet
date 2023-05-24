import { IShowtime } from '../../../Interfaces';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

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
  const [value, setValue] = useState<Date>(new Date());

  return (
    <form>
      <DatePicker
        id='date'
        onSelect={value => setValue(value.toDate())}
        showTime={{ format: 'HH:mm', hideDisabledOptions: true }}
        format='YYYY-MM-DD HH:mm'
        size='large'
        defaultValue={dayjs()}
        disabledDate={current =>
          current < dayjs().endOf('day').add(-1, 'day') ||
          current > dayjs().endOf('day').add(2, 'week')
        }
        disabledTime={() => {
          const disabledHours = () => {
            const hours = [];
            for (let i = 0; i <= 8; i++) {
              hours.push(i);
            }
            for (let i = 23; i >= 18; i--) {
              hours.push(i);
            }

            const currentDayHours = props.showtimes.reduce((acc, showtime) => {
              if (dayjs(showtime.time.start).isSame(dayjs(value), 'day'))
                for (
                  let i = dayjs(showtime.time.start).hour();
                  i <= dayjs(showtime.time.end).hour();
                  i++
                ) {
                  acc.push(i);
                }

              return acc;
            }, [] as number[]);

            return [...hours, ...currentDayHours];
          };
          return {
            disabledHours: disabledHours,
          };
        }}
      />
    </form>
  );
};

export default ShowtimeAdd;
