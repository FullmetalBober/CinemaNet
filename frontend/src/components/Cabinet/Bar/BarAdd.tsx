import { useState } from 'react';
import { IBar } from '../../../Interfaces';
import { useForm } from '../../../hooks/form-hook';
import ImageUpload from '../../UI/Form/ImageUpload';
import Input from '../../UI/Form/Input';
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from '../../../utils/validators';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';
import axios from 'axios';
import { CinemaState } from '../../../contexts/CinemaProvider';

interface IProps {
  setBars: React.Dispatch<React.SetStateAction<IBar[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
}

const BarAdd = (props: IProps) => {
  const { cinema } = CinemaState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: null,
        isValid: false,
      },
      price: {
        value: null,
        isValid: false,
      },
      imageCover: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  const createMovieSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      setIsLoading(true);
      try {
        const body: { [key: string]: any } = {};
        Object.entries(formState.inputs).forEach(([key, el]) => {
          if (key === 'imageCover') return;
          body[key] = el.value;
        });

        body.cinema = cinema._id;

        let response = await axios.post('/api/v1/bars', body);

        if (formState.inputs.imageCover.value !== File) {
          const formData = new FormData();
          formData.append('imageCover', formState.inputs.imageCover.value);
          response = await axios.patch(
            `/api/v1/bars/${response.data.data.data._id}`,
            formData
          );
        }
        props.setBars(prevState => [...prevState, response.data.data.data]);
        props.setMode(props.buttons[0]);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
  };

  return (
    <form onSubmit={createMovieSubmitHandler} className='flex flex-col gap-3'>
      <div className='flex gap-10'>
        <ImageUpload
          id='imageCover'
          preview='/images/bar/default.png'
          width={215}
          height={215}
          rounded='rounded'
          onInput={inputHandler}
          initialValid={true}
        />
        <div>
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
            label='Price'
            id='price'
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0.01)]}
            errorText='Please enter a valid price'
            autoComplete='off'
            onInput={inputHandler}
          />
        </div>
      </div>
      <Button disabled={!formState.isValid || isLoading}>
        {isLoading ? <Loading size={28} /> : 'Create'}
      </Button>
    </form>
  );
};

export default BarAdd;
