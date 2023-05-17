import { UserState } from '../../contexts/UserProvider';
import { useForm } from '../../hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../utils/validators';
import ImageUpload from '../UI/Form/ImageUpload';
import Input from '../UI/Form/Input';

const ProfileChangeInfo = () => {
  const { user } = UserState();
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      photo: {
        value: '',
        isValid: false,
      },
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
    </form>
  );
};

export default ProfileChangeInfo;
