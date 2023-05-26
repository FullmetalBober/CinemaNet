import { IHall, IMovie, IShowtime } from '../../../Interfaces';
import ShowtimeDatePicker from './ShowtimeDatePicker';
import { useForm } from '../../../hooks/form-hook';
import ShowtimeSelectHall from './ShowtimeSelectHall';
import ShowtimeSelectMovie from './ShowtimeSelectMovie';
import { useState } from 'react';

interface IProps {
  showtimes: IShowtime[];
  setShowtimes: React.Dispatch<React.SetStateAction<IShowtime[]>>;
}

const ShowtimeAdd = (props: IProps) => {
  const [hall, setHall] = useState<IHall>({} as IHall);
  const [movie, setMovie] = useState<IMovie>({} as IMovie);
  const [formState, inputHandler] = useForm(
    {
      date: {
        value: null,
        isValid: false,
      },
      hall: {
        value: null,
        isValid: false,
      },
      movie: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  return (
    <form className='flex flex-col gap-3'>
      <ShowtimeSelectHall
        hall={hall}
        setHall={setHall}
        inputHandler={inputHandler}
      />
      <ShowtimeSelectMovie
        movie={movie}
        setMovie={setMovie}
        inputHandler={inputHandler}
      />
      <ShowtimeDatePicker
        inputHandler={inputHandler}
        formState={formState}
        movie={movie}
        {...props}
      />
    </form>
  );
};

export default ShowtimeAdd;
