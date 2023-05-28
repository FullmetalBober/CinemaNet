import { useState } from 'react';
import { IMovie } from '../../../Interfaces';
import { useForm } from '../../../hooks/form-hook';
import formStateMovie from '../../utils/formStateMovie';
import ImageUpload from '../../UI/Form/ImageUpload';

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
      //TODO: Implament form and image upload
      <ImageUpload
        id='imageCover'
        preview={formState.inputs.imageCover.value}
        width={190}
        rounded='rounded'
        onInput={inputHandler}
        initialValid={true}
      />
    </form>
  );
};

export default MovieAdd;
