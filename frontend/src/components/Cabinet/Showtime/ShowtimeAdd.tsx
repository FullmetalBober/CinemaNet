import Datepicker from 'react-tailwindcss-datepicker';

import { IShowtime } from '../../../Interfaces';
import { useState } from 'react';

interface IProps {
  showtimes: IShowtime[];
  setShowtimes: React.Dispatch<React.SetStateAction<IShowtime[]>>;
}

interface IProps {
  showtimes: IShowtime[];
  setShowtimes: React.Dispatch<React.SetStateAction<IShowtime[]>>;
}

const ShowtimeAdd = (props: IProps) => {
  const [value, setValue] = useState<any>({
    startDate: null,
    endDate: null,
  });

  return (
    <div>
      <Datepicker
        minDate={new Date(new Date().setHours(0, 0, 0, 0))}
        maxDate={new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7 * 2)}
        useRange={false}
        asSingle={true}
        readOnly={true}
        value={value}
        primaryColor={'red'}
        onChange={val => setValue(val)}
        containerClassName='relative w-72'
      />
    </div>
  );
};

export default ShowtimeAdd;
