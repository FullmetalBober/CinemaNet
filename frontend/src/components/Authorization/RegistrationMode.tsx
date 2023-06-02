import { UserState } from '../../contexts/UserProvider';
import { InputData } from '../../hooks/form-hook';
import TextOpacity from '../UI/TextOpacity';
import Input from '../UI/Form/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_EQUAL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../utils/validators';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';
import Loading from '../UI/Loading';
import { useHttpClient } from '../../hooks/http-hook';

interface IProps {
  inputHandler?: (id: string, value: string, isValid: boolean) => void;
  formState: {
    inputs: InputData;
    isValid: boolean;
  };
}

const RegistrationPage = ({ inputHandler, formState }: IProps) => {
  const { sendRequest, isLoading } = useHttpClient();
  const { setUser } = UserState();
  const navigate = useNavigate();

  const authSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      try {
        const data = {
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          passwordConfirm: formState.inputs.passwordConfirm.value,
        };
        const responds = await sendRequest({
          url: '/api/v1/users/signup',
          method: 'POST',
          data,
          showSuccessMsg: 'Register successfully',
          showErrMsg: true,
        });
        setUser(responds?.data.data.user);
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <>
      <h1 className='text-5xl font-bold'>Create a personal account</h1>
      <TextOpacity className='text-2xl'>
        All your orders and personal information will be here
      </TextOpacity>
      <form onSubmit={authSubmitHandler} className='p-3'>
        <Input
          element='input'
          type='text'
          label='Name'
          id='name'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid name'
          autoComplete='off'
          onInput={inputHandler}
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
        />
        <Input
          element='input'
          type='password'
          label='Password'
          id='password'
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
          errorText='Please enter a valid password'
          autoComplete='off'
          onInput={inputHandler}
        />
        <Input
          element='input'
          type='password'
          label='Confirm password'
          id='passwordConfirm'
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_EQUAL(formState.inputs.password.value),
          ]}
          errorText='Please enter a valid confirmation'
          autoComplete='off'
          onInput={inputHandler}
        />
        <Button disabled={!formState.isValid || isLoading}>
          {isLoading ? <Loading size={28} /> : 'Register'}
        </Button>
      </form>
    </>
  );
};

export default RegistrationPage;
