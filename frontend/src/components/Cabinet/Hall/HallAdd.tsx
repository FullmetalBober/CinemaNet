import { useEffect, useState } from 'react';
import { IHall, ISeat } from '../../../Interfaces';
import { useForm } from '../../../hooks/form-hook';
import Input from '../../UI/Form/Input';
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from '../../../utils/validators';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';
import { AxiosResponse } from 'axios';
import { CinemaState } from '../../../contexts/CinemaProvider';
import Seats from '../../UI/Seats/Seats';
import TextClick from '../../UI/TextClick';
import DangerContent from '../../UI/Details/DangerContent';
import DeleteAction from '../DeleteAction';
import { useHttpClient } from '../../../hooks/http-hook';

interface IProps {
  setHalls: React.Dispatch<React.SetStateAction<IHall[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
  searchParam: string;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

const HallAdd = (props: IProps) => {
  const { sendRequest, isLoading } = useHttpClient();
  const { cinema } = CinemaState();
  const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([]);
  const [hall, setHall] = useState<IHall>({} as IHall);
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
          lux: 2,
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
    if (props.searchParam) {
      (async () => {
        const response = await sendRequest({
          url: `/api/v1/halls/${props.searchParam}`,
          showErrMsg: true,
        });
        if (!response) return;

        props.setSearchParam('');
        setHall(response.data.data.data);
        formState.inputs.seats.value = response.data.data.data.seats;
        Object.values(formState.inputs).map(el => {
          el.isValid = true;
        });
      })();
    }
    setLastsSeats();
  }, [props.searchParam]);

  const setLastsSeats = () => {
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
      const body: { [key: string]: any } = {};
      Object.entries(formState.inputs).forEach(([key, el]) => {
        body[key] = el.value;
      });

      body.cinema = cinema._id;

      body.price = {
        standard: body.priceStandard,
        lux: body.priceLux,
      };

      let response: AxiosResponse<any, any> | undefined;
      if (hall._id) {
        response = await sendRequest({
          url: `/api/v1/halls/${hall._id}`,
          method: 'PATCH',
          data: body,
          showSuccessMsg: 'Hall updated successfully!',
          showErrMsg: true,
        });
        props.setHalls(prevState =>
          prevState.map(el =>
            el._id === hall._id ? response?.data.data.data : el
          )
        );
      } else {
        response = await sendRequest({
          url: '/api/v1/halls',
          method: 'POST',
          data: body,
          showSuccessMsg: 'Hall created successfully!',
          showErrMsg: true,
        });
        props.setHalls(prevState => [...prevState, response?.data.data.data]);
      }

      props.setMode(props.buttons[0]);
    })();
  };

  const handleDelete = async () => {
    const response = await sendRequest({
      url: `/api/v1/halls/${hall._id}`,
      method: 'DELETE',
      showSuccessMsg: 'Hall deleted successfully!',
      showErrMsg: true,
    });
    if (response?.data === '') {
      props.setHalls(prevState => prevState.filter(el => el._id !== hall._id));
      props.setMode(props.buttons[0]);
    }
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
    setLastsSeats();
  };

  const rowAddHandler = () => {
    const seats = formState.inputs.seats.value;
    seats.standard.push({
      row: seats.standard.length + 1,
      seats: 2,
    });
    inputHandler('seats', seats, true);
    setLastsSeats();
  };

  if (props.searchParam !== '') return <Loading />;
  return (
    <>
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
          value={hall.name}
          initialValid={hall._id ? true : false}
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
          value={hall.price ? `${hall.price.standard}` : undefined}
          initialValid={hall._id ? true : false}
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
          value={hall.price ? `${hall.price.lux}` : undefined}
          initialValid={hall._id ? true : false}
        />

        <Button disabled={!formState.isValid || isLoading}>
          {isLoading ? <Loading size={28} /> : 'Submit'}
        </Button>
      </form>
      {hall._id && (
        <DangerContent className='mt-10 px-5' classNameChild='flex gap-14'>
          <DeleteAction handleDelete={handleDelete} />
        </DangerContent>
      )}
    </>
  );
};

export default HallAdd;
