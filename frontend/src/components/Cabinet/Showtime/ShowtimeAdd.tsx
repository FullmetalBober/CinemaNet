import { IHall, IMovie, IShowtime } from '../../../Interfaces';
import ShowtimeDatePicker from './ShowtimeDatePicker';
import { useForm } from '../../../hooks/form-hook';
import ShowtimeSelectHall from './ShowtimeSelectHall';
import ShowtimeSelectMovie from './ShowtimeSelectMovie';
import { useState } from 'react';
import GroupPriceCard from '../../UI/Seats/GroupPrice';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';
import axios from 'axios';

interface IProps {
  showtimes: IShowtime[];
  setShowtimes: React.Dispatch<React.SetStateAction<IShowtime[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
}

const ShowtimeAdd = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
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

  const createShowtimeSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      setIsLoading(true);
      try {
        const responds = await axios.post('/api/v1/showtimes', {
          movie: formState.inputs.movie.value,
          hall: formState.inputs.hall.value,
          time: {
            start: formState.inputs.date.value,
          },
        });

        const newShowtime = await axios.get(
          `/api/v1/showtimes/${responds.data.data.data._id}`
        );

        props.setShowtimes(prevState => [
          ...prevState,
          newShowtime.data.data.data,
        ]);
        props.setMode(props.buttons[0]);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
  };

  return (
    <form
      onSubmit={createShowtimeSubmitHandler}
      className='flex flex-col gap-3'
    >
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
      {hall._id && movie._id && (
        <GroupPriceCard
          standardPrice={
            Math.round(hall.price.standard + movie.price * 100) / 100
          }
          luxPrice={hall.price.lux + movie.price}
        />
      )}
      <ShowtimeDatePicker
        inputHandler={inputHandler}
        formState={formState}
        movie={movie}
        {...props}
      />

      <Button disabled={!formState.isValid || isLoading}>
        {isLoading ? <Loading size={28} /> : 'Add showtime'}
      </Button>
    </form>
  );
};

export default ShowtimeAdd;
