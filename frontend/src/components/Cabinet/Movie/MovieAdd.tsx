import { useEffect, useState } from 'react';
import { IMovie } from '../../../Interfaces';
import { useForm } from '../../../hooks/form-hook';
import formStateMovie from '../../../utils/formStateMovie';
import Loading from '../../UI/Loading';
import { AxiosResponse } from 'axios';
import DangerContent from '../../UI/Details/DangerContent';
import DeleteAction from '../DeleteAction';
import MovieForm from './MovieForm';
import { useHttpClient } from '../../../hooks/http-hook';

interface IProps {
  setMovies: React.Dispatch<React.SetStateAction<IMovie[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
  searchParam: string;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

const MovieAdd = (props: IProps) => {
  const { sendRequest, isLoading } = useHttpClient();
  const [formState, inputHandler] = useForm(formStateMovie, false);
  const [movie, setMovie] = useState<IMovie>({} as IMovie);

  useEffect(() => {
    if (!props.searchParam) return;
    (async () => {
      const response = await sendRequest({
        url: `/api/v1/movies/${props.searchParam}`,
        showErrMsg: true,
      });
      if (!response) return;
      props.setSearchParam('');
      setMovie(response.data.data.data);

      Object.values(formState.inputs).map(el => {
        el.isValid = true;
      });
    })();
  }, [props.searchParam]);

  const createMovieSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      const body: { [key: string]: any } = {};
      Object.entries(formState.inputs).forEach(([key, el]) => {
        if (el.value === null || key === 'imageCover') return;
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

      let response: AxiosResponse<any, any> | undefined;
      if (movie._id) {
        response = await sendRequest({
          url: `/api/v1/movies/${movie._id}`,
          method: 'PATCH',
          data: body,
          showSuccessMsg: 'Movie updated successfully!',
          showErrMsg: true,
        });

        props.setMovies(prevState =>
          prevState.map(el =>
            el._id === movie._id ? response?.data.data.data : el
          )
        );
      } else {
        response = await sendRequest({
          url: '/api/v1/movies',
          method: 'POST',
          data: body,
          showSuccessMsg: 'Movie created successfully!',
          showErrMsg: true,
        });

        props.setMovies(prevState => [...prevState, response?.data.data.data]);
      }

      if (formState.inputs.imageCover.value !== null) {
        const formData = new FormData();
        formData.append('imageCover', formState.inputs.imageCover.value);
        response = await sendRequest({
          url: `/api/v1/movies/${response?.data.data.data._id}`,
          method: 'PATCH',
          data: formData,
          showErrMsg: true,
        });
      }

      props.setMode(props.buttons[0]);
    })();
  };

  const handleDelete = async () => {
    const response = await sendRequest({
      url: `/api/v1/movies/${movie._id}`,
      method: 'DELETE',
      showSuccessMsg: 'Movie deleted successfully!',
      showErrMsg: true,
    });

    if (response?.data === '') {
      props.setMovies(prevState =>
        prevState.filter(el => el._id !== movie._id)
      );
      props.setMode(props.buttons[0]);
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
