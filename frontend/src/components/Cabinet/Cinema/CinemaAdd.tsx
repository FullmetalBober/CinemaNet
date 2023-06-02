import { useEffect, useState } from 'react';
import { ICinema } from '../../../Interfaces';
import { useForm } from '../../../hooks/form-hook';
import ImageUpload from '../../UI/Form/ImageUpload';
import Input from '../../UI/Form/Input';
import { VALIDATOR_REQUIRE } from '../../../utils/validators';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';
import { AxiosResponse } from 'axios';
import Map from '../../UI/Map';
import DangerContent from '../../UI/Details/DangerContent';
import DeleteAction from '../DeleteAction';
import { useHttpClient } from '../../../hooks/http-hook';

interface IProps {
  setCinemas: React.Dispatch<React.SetStateAction<ICinema[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
  searchParam: string;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

const CinemaAdd = (props: IProps) => {
  const { sendRequest, isLoading } = useHttpClient();
  const [cinema, setCinema] = useState<ICinema>({} as ICinema);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: null,
        isValid: false,
      },
      city: {
        value: null,
        isValid: false,
      },
      imageCover: {
        value: null,
        isValid: true,
      },
      coordinates: {
        value: null,
        isValid: true,
      },
      address: {
        value: null,
        isValid: true,
      },
      description: {
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
        url: `/api/v1/cinemas/${props.searchParam}`,
        showErrMsg: true,
      });
      if (!response) return;

      props.setSearchParam('');

      setCinema(response.data.data.data);

      formState.inputs.coordinates.value =
        response.data.data.data.location.coordinates;

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

      body.location = {
        city: formState.inputs.city.value,
        address: formState.inputs.address.value,
        coordinates: formState.inputs.coordinates.value,
        description: formState.inputs.description.value,
      };

      let response: AxiosResponse<any, any> | undefined;
      if (cinema._id) {
        response = await sendRequest({
          url: `/api/v1/cinemas/${cinema._id}`,
          method: 'PATCH',
          data: body,
          showSuccessMsg: 'Cinema updated successfully!',
          showErrMsg: true,
        });
        props.setCinemas(prevState =>
          prevState.map(el =>
            el._id === cinema._id ? response?.data.data.data : el
          )
        );
      } else {
        response = await sendRequest({
          url: '/api/v1/cinemas',
          method: 'POST',
          data: body,
          showSuccessMsg: 'Cinema created successfully!',
          showErrMsg: true,
        });
        props.setCinemas(prevState => [...prevState, response?.data.data.data]);
      }
      if (formState.inputs.imageCover.value !== null) {
        const formData = new FormData();
        formData.append('imageCover', formState.inputs.imageCover.value);
        response = await sendRequest({
          url: `/api/v1/cinemas/${response?.data.data.data._id}`,
          method: 'PATCH',
          data: formData,
          showErrMsg: true,
        });
      }
      props.setMode(props.buttons[0]);
    })();
  };

  const handleDelete = async () => {
    try {
      const response = await sendRequest({
        url: `/api/v1/cinemas/${cinema._id}`,
        method: 'DELETE',
        showSuccessMsg: 'Cinema deleted successfully!',
        showErrMsg: true,
      });
      if (response?.data === '') {
        props.setCinemas(prevState =>
          prevState.filter(el => el._id !== cinema._id)
        );
        props.setMode(props.buttons[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    const coordinates = [lng, lat];

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: e.latLng }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        let address = results[0].formatted_address;
        address = address.split(',').slice(0, 2).join(',');
        console.log(address);
        inputHandler('address', address, true);
      }
    });
    inputHandler('coordinates', coordinates, true);
  };

  return (
    <>
      <form onSubmit={createMovieSubmitHandler} className='flex flex-col gap-3'>
        <ImageUpload
          id='imageCover'
          preview={cinema.imageCover || '/images/cinema/default.jpg'}
          width={1880}
          height={780}
          rounded='rounded'
          onInput={inputHandler}
          initialValid={true}
        />
        <Map
          zoom={5}
          center={{
            lat: formState.inputs.coordinates.value?.[1] || 49.299063,
            lng: formState.inputs.coordinates.value?.[0] || 32.022437,
          }}
          marker={formState.inputs.coordinates.value}
          handleMapClick={handleMapClick}
        />

        <Input
          element='input'
          type='text'
          label='Name*'
          id='name'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid name'
          autoComplete='off'
          onInput={inputHandler}
          value={cinema.name}
          initialValid={cinema._id ? true : false}
        />

        <Input
          element='input'
          type='text'
          label='City*'
          id='city'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid city'
          autoComplete='off'
          onInput={inputHandler}
          value={cinema.location?.city}
          initialValid={cinema._id ? true : false}
        />

        <Input
          type='text'
          label='Description'
          id='description'
          errorText='Please enter a valid description'
          autoComplete='off'
          onInput={inputHandler}
          initialValid={true}
          value={cinema.location?.description}
        />

        <Button disabled={!formState.isValid || isLoading}>
          {isLoading ? <Loading size={28} /> : 'Create'}
        </Button>
      </form>
      {cinema._id && (
        <DangerContent className='mt-10 px-5' classNameChild='flex gap-14'>
          <DeleteAction handleDelete={handleDelete} />
        </DangerContent>
      )}
    </>
  );
};

export default CinemaAdd;
