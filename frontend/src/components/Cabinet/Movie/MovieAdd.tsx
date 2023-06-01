import { useEffect, useState } from 'react';
import { IMovie } from '../../../Interfaces';
import { useForm } from '../../../hooks/form-hook';
import formStateMovie from '../../utils/formStateMovie';
import Loading from '../../UI/Loading';
import axios, { AxiosResponse } from 'axios';
import DangerContent from '../../UI/Details/DangerContent';
import DeleteAction from '../DeleteAction';
import MovieForm from './MovieForm';

interface IProps {
  setMovies: React.Dispatch<React.SetStateAction<IMovie[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
  searchParam: string;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

const MovieAdd = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, inputHandler] = useForm(formStateMovie, false);
  const [movie, setMovie] = useState<IMovie>({} as IMovie);

  useEffect(() => {
    if (!props.searchParam) return;
    (async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/v1/movies/${props.searchParam}`);
        props.setSearchParam('');
        setMovie(response.data.data.data);

        Object.values(formState.inputs).map(el => {
          el.isValid = true;
        });
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
  }, [props.searchParam]);

  const createMovieSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      setIsLoading(true);
      try {
        const body: { [key: string]: any } = {};
        Object.entries(formState.inputs).forEach(([key, el]) => {
          if (el.value === '' || el.value === null || key === 'imageCover')
            return;
          body[key] = el.value;
        });

        if (body.rentalPeriod)
          body.rentalPeriod = {
            start: formState.inputs.rentalPeriod.value[0].toISOString(),
            end: formState.inputs.rentalPeriod.value[1].toISOString(),
          };

        if (body.trailer && body.trailer.includes('watch?v=')) {
          const trailer = body.trailer.split('watch?v=');
          body.trailer = trailer[0] + 'embed/' + trailer[1];
        }

        let response: AxiosResponse<any, any>;
        if (movie._id) {
          response = await axios.patch(`/api/v1/movies/${movie._id}`, body);
          props.setMovies(prevState =>
            prevState.map(el =>
              el._id === movie._id ? response.data.data.data : el
            )
          );
        } else {
          response = await axios.post('/api/v1/movies', body);
          props.setMovies(prevState => [...prevState, response.data.data.data]);
        }

        if (formState.inputs.imageCover.value !== null) {
          console.log(formState.inputs.imageCover.value);
          const formData = new FormData();
          formData.append('imageCover', formState.inputs.imageCover.value);
          response = await axios.patch(
            `/api/v1/movies/${response.data.data.data._id}`,
            formData
          );
        }

        props.setMode(props.buttons[0]);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/v1/movies/${movie._id}`);
      if (response.data === '') {
        props.setMovies(prevState =>
          prevState.filter(el => el._id !== movie._id)
        );
        props.setMode(props.buttons[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (props.searchParam !== '') return <Loading />;
  return (
    <>
      <MovieForm
        createMovieSubmitHandler={createMovieSubmitHandler}
        formState={formState}
        inputHandler={inputHandler}
        movie={movie}
        isLoading={isLoading}
      />

      {movie._id && (
        <DangerContent className='mt-10 px-5' classNameChild='flex gap-14'>
          <DeleteAction handleDelete={handleDelete} />
        </DangerContent>
      )}
    </>
  );
};

export default MovieAdd;
