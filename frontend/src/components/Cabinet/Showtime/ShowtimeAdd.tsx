import { IShowtime } from '../../../Interfaces';
import ShowtimeDatePicker from './ShowtimeDatePicker';
import { useForm } from '../../../hooks/form-hook';
import ShowtimeSelectHall from './ShowtimeSelectHall';

interface IProps {
  showtimes: IShowtime[];
}

const ShowtimeAdd = (props: IProps) => {
  const [formState, inputHandler] = useForm(
    {
      date: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  return (
    <form className='flex flex-col gap-3'>
      <ShowtimeSelectHall />
      <ShowtimeDatePicker inputHandler={inputHandler} {...props} />
    </form>
  );
};

export default ShowtimeAdd;
