import { DatePicker } from 'antd';
import DynamicInputs from '../../UI/Form/DynamicInputs';
import ImageUpload from '../../UI/Form/ImageUpload';
import Input from '../../UI/Form/Input';
import {
  VALIDATOR_MAX,
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
} from '../../../utils/validators';
import dayjs from 'dayjs';
import { IGenre } from '../../../Interfaces';
import MovieAddGenres from './MovieAddGenres';
import Loading from '../../UI/Loading';
import Button from '../../UI/Button';

const { RangePicker } = DatePicker;

interface IProps {
  createMovieSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  movie: any;
  inputHandler: (id: string, value: any, isValid: boolean) => void;
  formState: any;
  isLoading: boolean;
}

const MovieForm = ({
  createMovieSubmitHandler,
  movie,
  inputHandler,
  formState,
  isLoading,
}: IProps) => {
  return (
    <form onSubmit={createMovieSubmitHandler} className='flex flex-col gap-3'>
      <div className='flex gap-10'>
        <ImageUpload
          id='imageCover'
          preview={movie.imageCover || '/images/movie/default.jpg'}
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
            value={movie.name}
            initialValid={movie._id ? true : false}
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
            value={movie.originalName}
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
            value={`${movie.price}`}
            initialValid={movie._id ? true : false}
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
            value={`${movie.duration}`}
            initialValid={movie._id ? true : false}
          />
          <Input
            element='input'
            type='number'
            label='Age restriction'
            id='ageRating'
            validators={[VALIDATOR_MIN(0), VALIDATOR_MAX(21)]}
            errorText='Please enter a valid restriction'
            autoComplete='off'
            onInput={inputHandler}
            initialValid={true}
            value={`${movie.ageRating}`}
          />
        </div>
      </div>
      <div>
        <div className='grid grid-cols-2'>
          <Input
            element='input'
            type='number'
            label='Release year'
            id='releaseYear'
            validators={[VALIDATOR_MIN(0), VALIDATOR_MAX(2100)]}
            errorText='Please enter a valid price'
            autoComplete='off'
            onInput={inputHandler}
            initialValid={true}
            value={movie.releaseYear ? `${movie.releaseYear}` : undefined}
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
            value={movie.trailer}
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
            value={movie.director}
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
            value={movie.language}
          />
        </div>
        <MovieAddGenres
          onInput={inputHandler}
          value={movie.genres as IGenre[]}
        />
        <DynamicInputs
          onInput={inputHandler}
          id='productions'
          label='Production'
          value={movie.productions}
        />
        <DynamicInputs
          onInput={inputHandler}
          id='studios'
          label='Studio'
          value={movie.studios}
        />
        <DynamicInputs
          onInput={inputHandler}
          id='scenarios'
          label='Scenario'
          value={movie.scenarios}
        />
        <DynamicInputs
          onInput={inputHandler}
          id='starrings'
          label='Starring'
          value={movie.starrings}
        />
        <Input
          type='text'
          label='Description'
          id='description'
          errorText='Please enter a valid description'
          autoComplete='off'
          onInput={inputHandler}
          initialValid={true}
          value={movie.description}
        />
      </div>
      <RangePicker
        defaultValue={
          movie.rentalPeriod && [
            dayjs(movie.rentalPeriod.start),
            dayjs(movie.rentalPeriod.end),
          ]
        }
        onChange={date => date && inputHandler('rentalPeriod', date, true)}
        size='large'
      />
      <Button disabled={!formState.isValid || isLoading}>
        {isLoading ? <Loading size={28} /> : 'Submit'}
      </Button>
    </form>
  );
};

export default MovieForm;
