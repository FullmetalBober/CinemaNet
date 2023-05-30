import { useEffect, useState } from 'react';
import { IHall, ISeat } from '../../../Interfaces';
import { useForm } from '../../../hooks/form-hook';
import Input from '../../UI/Form/Input';
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from '../../../utils/validators';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';
import axios from 'axios';
import { CinemaState } from '../../../contexts/CinemaProvider';
import Seats from '../../UI/Seats/Seats';
import TextClick from '../../UI/TextClick';

interface IProps {
  setHalls: React.Dispatch<React.SetStateAction<IHall[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
}

const HallAdd = (props: IProps) => {
  const { cinema } = CinemaState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([]);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: null,
        isValid: false,
      },
      seats: {
        value: {
          standard: [
            {
              row: 1,
              seats: 1,
            },
          ],
          lux: 1,
        },
        isValid: true,
      },
      priceStandard: {
        value: 0,
        isValid: false,
      },
      priceLux: {
        value: 0,
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    setLastsSeats(formState.inputs.seats.value);
  }, []);

  const setLastsSeats = (hall: IHall[]) => {
    const seats = formState.inputs.seats.value;
    const selectedSeats: ISeat[] = [];
    seats.standard.forEach((el: { row: number; seats: number }) => {
      if (el.seats === 1 && seats.standard.length !== 1) return;
      selectedSeats.push({
        row: el.row,
        col: el.seats,
        isLux: false,
        price: formState.inputs.priceStandard.value,
      });
    });
    selectedSeats.push({
      row: seats.standard.length + 1,
      col: seats.lux,
      isLux: true,
      price: formState.inputs.priceLux.value,
    });

    setSelectedSeats(selectedSeats);
  };

  const createMovieSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      setIsLoading(true);
      try {
        const body: { [key: string]: any } = {};
        Object.entries(formState.inputs).forEach(([key, el]) => {
          body[key] = el.value;
        });

        body.cinema = cinema._id;

        body.price = {
          standard: body.priceStandard,
          lux: body.priceLux,
        };

        let response = await axios.post('/api/v1/halls', body);

        props.setHalls(prevState => [...prevState, response.data.data.data]);
        props.setMode(props.buttons[0]);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
  };

  const handleSelectSeat = (
    row: number,
    col: number,
    isLux: boolean,
    _price: number
  ) => {
    const seats = formState.inputs.seats.value;
    if (isLux) {
      if (seats.lux === col) seats.lux += 1;
      else seats.lux -= 1;
    } else {
      let index = 1;
      seats.standard = seats.standard.map(
        (el: { row: number; seats: number }) => {
          if (el.row === row) {
            if (el.seats === col && el.seats !== 1) el.seats += 1;
            else {
              el.seats -= 1;
            }
          }
          if (el.seats !== 0) el.row = index++;
          return el;
        }
      );

      seats.standard = seats.standard.filter(
        (el: { row: number; seats: number }) => el.seats !== 0
      );

      if (seats.standard.length === 0)
        seats.standard.push({ row: 1, seats: 2 });
    }
    inputHandler('seats', seats, true);
    setLastsSeats(seats);
  };

  const rowAddHandler = () => {
    const seats = formState.inputs.seats.value;
    seats.standard.push({
      row: seats.standard.length + 1,
      seats: 2,
    });
    inputHandler('seats', seats, true);
    setLastsSeats(seats);
  };

  return (
    <form onSubmit={createMovieSubmitHandler} className='flex flex-col gap-3'>
      <div className='flex justify-center'>
        <TextClick
          onClick={rowAddHandler}
          className='text-4xl hover:text-[#ff0a14]'
        >
          Add row
        </TextClick>
      </div>

      <Seats
        hall={
          {
            seats: formState.inputs.seats.value,
            price: {
              standard: formState.inputs.priceStandard.value,
              lux: formState.inputs.priceLux.value,
            },
          } as IHall
        }
        handleSelectSeat={handleSelectSeat}
        selectedSeats={selectedSeats}
      />

      <Input
        element='input'
        type='text'
        label='Name'
        id='name'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid name'
        autoComplete='off'
        onInput={inputHandler}
      />

      <Input
        element='input'
        type='number'
        label='Price (Standard)'
        id='priceStandard'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0.01)]}
        errorText='Please enter a valid price'
        autoComplete='off'
        onInput={inputHandler}
      />

      <Input
        element='input'
        type='number'
        label='Price (Lux)'
        id='priceLux'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0.01)]}
        errorText='Please enter a valid price'
        autoComplete='off'
        onInput={inputHandler}
      />

      <Button disabled={!formState.isValid || isLoading}>
        {isLoading ? <Loading size={28} /> : 'Create'}
      </Button>
    </form>
  );
};

export default HallAdd;
