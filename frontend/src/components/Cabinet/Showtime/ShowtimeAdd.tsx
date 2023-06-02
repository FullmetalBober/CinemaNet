import { IHall, IMovie, IShowtime } from '../../../Interfaces';
import ShowtimeDatePicker from './ShowtimeDatePicker';
import { useForm } from '../../../hooks/form-hook';
import ShowtimeSelectHall from './ShowtimeSelectHall';
import ShowtimeSelectMovie from './ShowtimeSelectMovie';
import { useState } from 'react';
import GroupPriceCard from '../../UI/Seats/GroupPrice';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';
import { useHttpClient } from '../../../hooks/http-hook';

interface IProps {
  showtimes: IShowtime[];
  setShowtimes: React.Dispatch<React.SetStateAction<IShowtime[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
}

const ShowtimeAdd = (props: IProps) => {
  const { sendRequest, isLoading } = useHttpClient();
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
      const body: { [key: string]: any } = {};
      Object.entries(formState.inputs).forEach(
        ([key, el]) => (body[key] = el.value)
      );
      body.time = {
        start: body.date,
      };

      let responds = await sendRequest({
        url: '/api/v1/showtimes',
        method: 'POST',
        data: body,
        showSuccessMsg: 'Showtime created successfully!',
        showErrMsg: true,
      });

      responds = await sendRequest({
        url: `/api/v1/showtimes/${responds?.data.data.data._id}`,
        showErrMsg: true,
      });

      props.setShowtimes(prevState => [...prevState, responds?.data.data.data]);
      props.setMode(props.buttons[0]);
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
