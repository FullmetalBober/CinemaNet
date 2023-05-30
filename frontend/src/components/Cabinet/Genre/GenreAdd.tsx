import { useState } from 'react';
import { IGenre } from '../../../Interfaces';
import { useForm } from '../../../hooks/form-hook';
import ImageUpload from '../../UI/Form/ImageUpload';
import Input from '../../UI/Form/Input';
import { VALIDATOR_REQUIRE } from '../../../utils/validators';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';
import axios from 'axios';

interface IProps {
  setGenres: React.Dispatch<React.SetStateAction<IGenre[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
}

const GenreAdd = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: null,
        isValid: false,
      },
      description: {
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

        let response = await axios.post('/api/v1/genres', body);

        if (formState.inputs.imageCover.value !== File) {
          const formData = new FormData();
          formData.append('imageCover', formState.inputs.imageCover.value);
          response = await axios.patch(
            `/api/v1/genres/${response.data.data.data._id}`,
            formData
          );
        }
        props.setGenres(prevState => [...prevState, response.data.data.data]);
        props.setMode(props.buttons[0]);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
  };

  return (
    <form onSubmit={createMovieSubmitHandler} className='flex flex-col gap-3'>
      <ImageUpload
        id='imageCover'
        preview='/images/genre/default.jpg'
        width={1024}
        height={704}
        rounded='rounded'
        onInput={inputHandler}
        initialValid={true}
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
        type='text'
        label='Description'
        id='description'
        errorText='Please enter a valid description'
        autoComplete='off'
        onInput={inputHandler}
        initialValid={true}
      />

      <Button disabled={!formState.isValid || isLoading}>
        {isLoading ? <Loading size={28} /> : 'Create'}
      </Button>
    </form>
  );
};

export default GenreAdd;
