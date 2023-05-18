import { useState } from 'react';
import { UserState } from '../../contexts/UserProvider';
import { useForm } from '../../hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../utils/validators';
import Button from '../UI/Button';
import ImageUpload from '../UI/Form/ImageUpload';
import Input from '../UI/Form/Input';
import Loading from '../UI/Loading';

const ProfileChangeInfo = () => {
  const { user } = UserState();
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
      }
    },
    false
  );

  return (
    <form>
      <ImageUpload
        id='photo'
        preview={user.photo}
        size={190}
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
