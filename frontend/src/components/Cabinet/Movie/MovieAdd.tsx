import { useState } from 'react';
import { IMovie } from '../../../Interfaces';
import { useForm } from '../../../hooks/form-hook';
import formStateMovie from '../../utils/formStateMovie';
import ImageUpload from '../../UI/Form/ImageUpload';
import Input from '../../UI/Form/Input';
import {
  VALIDATOR_MAX,
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
} from '../../../utils/validators';
import MovieAddGenres from './MovieAddGenres';
import DynamicInputs from '../../UI/Form/DynamicInputs';

interface IProps {
  setMovies: React.Dispatch<React.SetStateAction<IMovie[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
}

const MovieAdd = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, inputHandler] = useForm(formStateMovie, false);

  const createMovieSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={createMovieSubmitHandler} className='flex flex-col gap-3'>
      <div className='flex gap-10'>
        <ImageUpload
          id='imageCover'
          preview='/images/movie/default.jpg'
          width={250}
          height={369}
          rounded='rounded'
          onInput={inputHandler}
          initialValid={true}
        />
        <div>
          <Input
            element='input'
            type='text'
            label='Name*'
            id='name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid name'
            autoComplete='off'
            onInput={inputHandler}
          />
          <Input
            element='input'
            type='text'
            label='Original name'
            id='originalName'
            errorText='Please enter a valid original name'
            autoComplete='off'
            onInput={inputHandler}
            initialValid={true}
          />
          <Input
            element='input'
            type='number'
            label='Price*'
            id='price'
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0.01)]}
            errorText='Please enter a valid price'
            autoComplete='off'
            onInput={inputHandler}
          />
          <Input
            element='input'
            type='number'
            label='Duration (min)*'
            id='duration'
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MIN(1),
              VALIDATOR_MAX(780),
            ]}
            errorText='Please enter a valid duration'
            autoComplete='off'
            onInput={inputHandler}
          />
          <Input
            element='input'
            type='number'
            label='Age restriction'
            id='ageRating'
            validators={[VALIDATOR_MIN(1), VALIDATOR_MAX(21)]}
            errorText='Please enter a valid restriction'
            autoComplete='off'
            onInput={inputHandler}
            initialValid={true}
          />
        </div>
      </div>
      <div className='grid grid-cols-2'>
        <Input
          element='input'
          type='number'
          label='Release year'
          id='releaseYear'
          validators={[VALIDATOR_MIN(1900), VALIDATOR_MAX(2100)]}
          errorText='Please enter a valid price'
          autoComplete='off'
          onInput={inputHandler}
          initialValid={true}
        />
        <Input
          element='input'
          type='text'
          label='Trailer (YouTube)'
          id='trailer'
          errorText='Please enter a valid trailer'
          autoComplete='off'
          onInput={inputHandler}
          initialValid={true}
        />
        <Input
          element='input'
          type='text'
          label='Director'
          id='director'
          errorText='Please enter a valid director'
          autoComplete='off'
          onInput={inputHandler}
          initialValid={true}
        />
        <Input
          element='input'
          type='text'
          label='Language'
          id='language'
          errorText='Please enter a valid language'
          autoComplete='off'
          onInput={inputHandler}
          initialValid={true}
        />
      </div>
      <MovieAddGenres onInput={inputHandler} />
      <DynamicInputs
        onInput={inputHandler}
        id='productions'
        label='Production'
      />
      <DynamicInputs onInput={inputHandler} id='studios' label='Studio' />
      <DynamicInputs onInput={inputHandler} id='scenarios' label='Scenario' />
      <DynamicInputs onInput={inputHandler} id='starrings' label='Starring' />
      <Input
        type='text'
        label='Language'
        id='language'
        errorText='Please enter a valid language'
        autoComplete='off'
        onInput={inputHandler}
        initialValid={true}
      />
    </form>
  );
};

export default MovieAdd;
