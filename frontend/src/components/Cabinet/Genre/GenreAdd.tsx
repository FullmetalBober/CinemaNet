import { useEffect, useState } from 'react';
import { IGenre } from '../../../Interfaces';
import { useForm } from '../../../hooks/form-hook';
import ImageUpload from '../../UI/Form/ImageUpload';
import Input from '../../UI/Form/Input';
import { VALIDATOR_REQUIRE } from '../../../utils/validators';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';
import { AxiosResponse } from 'axios';
import DangerContent from '../../UI/Details/DangerContent';
import DeleteAction from '../DeleteAction';
import { useHttpClient } from '../../../hooks/http-hook';

interface IProps {
  setGenres: React.Dispatch<React.SetStateAction<IGenre[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
  searchParam: string;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

const GenreAdd = (props: IProps) => {
  const { sendRequest, isLoading } = useHttpClient();
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
      const response = await sendRequest({
        url: `/api/v1/genres/${props.searchParam}`,
        showErrMsg: true,
      });
      if (!response) return;

      props.setSearchParam('');
      setGenre(response.data.data.data);

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
        if (key === 'imageCover') return;
        body[key] = el.value;
      });

      let response: AxiosResponse<any, any> | undefined;
      if (genre._id) {
        response = await sendRequest({
          url: `/api/v1/genres/${genre._id}`,
          method: 'PATCH',
          data: body,
          showSuccessMsg: 'Genre updated successfully!',
          showErrMsg: true,
        });
        props.setGenres(prevState =>
          prevState.map(el =>
            el._id === genre._id ? response?.data.data.data : el
          )
        );
      } else {
        response = await sendRequest({
          url: '/api/v1/genres',
          method: 'POST',
          data: body,
          showSuccessMsg: 'Genre created successfully!',
          showErrMsg: true,
        });
        props.setGenres(prevState => [...prevState, response?.data.data.data]);
      }

      if (formState.inputs.imageCover.value !== null) {
        const formData = new FormData();
        formData.append('imageCover', formState.inputs.imageCover.value);
        await sendRequest({
          url: `/api/v1/genres/${response?.data.data.data._id}`,
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
      url: `/api/v1/genres/${genre._id}`,
      method: 'DELETE',
      showSuccessMsg: 'Genre deleted successfully!',
      showErrMsg: true,
    });

    if (response?.data === '') {
      props.setGenres(prevState =>
        prevState.filter(el => el._id !== genre._id)
      );
      props.setMode(props.buttons[0]);
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
