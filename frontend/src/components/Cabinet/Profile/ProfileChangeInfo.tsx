import { useState } from 'react';
import { UserState } from '../../../contexts/UserProvider';
import { useForm } from '../../../hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../../utils/validators';
import Button from '../../UI/Button';
import ImageUpload from '../../UI/Form/ImageUpload';
import Input from '../../UI/Form/Input';
import Loading from '../../UI/Loading';
import axios from 'axios';

const ProfileChangeInfo = () => {
  const { user, setUser } = UserState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: true,
      },
      email: {
        value: '',
        isValid: true,
      },
      photo: {
        value: File,
        isValid: true,
      },
    },
    false
  );

  const updateInfoSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('name', formState.inputs.name.value);
        formData.append('email', formState.inputs.email.value);
        if (formState.inputs.photo.value !== File)
          formData.append('photo', formState.inputs.photo.value);
        const responds = await axios.patch('/api/v1/users/updateMe', formData);
        setUser(responds.data.data.user);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
  };

  return (
    <form onSubmit={updateInfoSubmitHandler} className='flex flex-col gap-1'>
      <ImageUpload
        id='photo'
        preview={user.photo}
        width={190}
        height={190}
        rounded='rounded-full'
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
        value={user.name}
        initialValid={true}
      />
      <Input
        element='input'
        type='email'
        label='Email'
        id='email'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        errorText='Please enter a valid email'
        autoComplete='off'
        onInput={inputHandler}
        value={user.email}
        initialValid={true}
      />
      <Button disabled={!formState.isValid || isLoading}>
        {isLoading ? <Loading size={28} /> : 'Save'}
      </Button>
    </form>
  );
};

export default ProfileChangeInfo;
