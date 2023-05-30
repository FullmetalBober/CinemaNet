import { useState } from 'react';
import { ICinema } from '../../../Interfaces';
import { useForm } from '../../../hooks/form-hook';
import ImageUpload from '../../UI/Form/ImageUpload';
import Input from '../../UI/Form/Input';
import { VALIDATOR_REQUIRE } from '../../../utils/validators';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';
import axios from 'axios';
import Map from '../../UI/Map';

interface IProps {
  setCinemas: React.Dispatch<React.SetStateAction<ICinema[]>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  buttons: string[];
}

const CinemaAdd = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
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

        body.location = {
          city: formState.inputs.city.value,
          address: formState.inputs.address.value,
          coordinates: formState.inputs.coordinates.value,
          description: formState.inputs.description.value,
        };

        let response = await axios.post('/api/v1/cinemas', body);

        if (formState.inputs.imageCover.value !== File) {
          const formData = new FormData();
          formData.append('imageCover', formState.inputs.imageCover.value);
          response = await axios.patch(
            `/api/v1/cinemas/${response.data.data.data._id}`,
            formData
          );
        }
        props.setCinemas(prevState => [...prevState, response.data.data.data]);
        props.setMode(props.buttons[0]);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
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
    <form onSubmit={createMovieSubmitHandler} className='flex flex-col gap-3'>
      <ImageUpload
        id='imageCover'
        preview='/images/cinema/default.jpg'
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

export default CinemaAdd;
