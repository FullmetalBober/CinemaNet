import { useEffect, useState } from 'react';
import { IGenre } from '../../../Interfaces';
import { useForm } from '../../../hooks/form-hook';
import ImageUpload from '../../UI/Form/ImageUpload';
import Input from '../../UI/Form/Input';
import { VALIDATOR_REQUIRE } from '../../../utils/validators';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';
import axios, { AxiosResponse } from 'axios';
import DangerContent from '../../UI/Details/DangerContent';
import DeleteAction from '../DeleteAction';

interface IProps {
  setGenres: React.Dispatch<React.SetStateAction<IGenre[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
  searchParam: string;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

const GenreAdd = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [genre, setGenre] = useState<IGenre>({} as IGenre);
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

  useEffect(() => {
    if (!props.searchParam) return;
    (async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/v1/genres/${props.searchParam}`);
        props.setSearchParam('');
        setGenre(response.data.data.data);

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
          if (key === 'imageCover') return;
          body[key] = el.value;
        });

        let response: AxiosResponse<any, any>;
        if (genre._id) {
          response = await axios.patch(`/api/v1/genres/${genre._id}`, body);
          props.setGenres(prevState =>
            prevState.map(el =>
              el._id === genre._id ? response.data.data.data : el
            )
          );
        } else {
          response = await axios.post('/api/v1/genres', body);
          props.setGenres(prevState => [...prevState, response.data.data.data]);
        }

        if (formState.inputs.imageCover.value !== null) {
          const formData = new FormData();
          formData.append('imageCover', formState.inputs.imageCover.value);
          response = await axios.patch(
            `/api/v1/genres/${response.data.data.data._id}`,
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
      const response = await axios.delete(`/api/v1/genres/${genre._id}`);
      if (response.data === '') {
        props.setGenres(prevState =>
          prevState.filter(el => el._id !== genre._id)
        );
        props.setMode(props.buttons[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={createMovieSubmitHandler} className='flex flex-col gap-3'>
        <ImageUpload
          id='imageCover'
          preview={genre.imageCover || '/images/genre/default.jpg'}
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
          value={genre.name}
          initialValid={genre._id ? true : false}
        />

        <Input
          type='text'
          label='Description'
          id='description'
          errorText='Please enter a valid description'
          autoComplete='off'
          onInput={inputHandler}
          initialValid={true}
          value={genre.description}
        />

        <Button disabled={!formState.isValid || isLoading}>
          {isLoading ? <Loading size={28} /> : 'Submit'}
        </Button>
      </form>
      {genre._id && (
        <DangerContent className='mt-10 px-5' classNameChild='flex gap-14'>
          <DeleteAction handleDelete={handleDelete} />
        </DangerContent>
      )}
    </>
  );
};

export default GenreAdd;
