import { useState } from 'react';
import { UserState } from '../../../contexts/UserProvider';
import { useForm } from '../../../hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../../utils/validators';
import Button from '../../UI/Button';
import ImageUpload from '../../UI/Form/ImageUpload';
import Input from '../../UI/Form/Input';
import Loading from '../../UI/Loading';
import { useHttpClient } from '../../../hooks/http-hook';

const ProfileChangeInfo = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const { user, setUser } = UserState();
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
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);
      formData.append('email', formState.inputs.email.value);
      if (formState.inputs.photo.value !== File)
        formData.append('photo', formState.inputs.photo.value);

      const responds = await sendRequest({
        url: '/api/v1/users/updateMe',
        method: 'PATCH',
        data: formData,
        showSuccessMsg: 'Your info updated successfully!',
        showErrMsg: true,
      });

      if (responds?.data.status === 'success') setUser(responds.data.data.user);
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
