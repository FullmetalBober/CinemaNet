import axios from 'axios';
import { InputData } from '../../hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../util/validators';
import Button from '../UI/Button';
import Input from '../UI/Input';
import TextOpacity from '../UI/TextOpacity';
import { UserState } from '../../contexts/UserProvider';

interface IProps {
  inputHandler?: (id: string, value: string, isValid: boolean) => void;
  formState: {
    inputs: InputData;
    isValid: boolean;
  };
}

const LoginPage = ({ inputHandler, formState }: IProps) => {
  const { setUser } = UserState();

  const authSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      try {
        const data = {
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        };
        const responds = await axios.post('/api/v1/users/login', data);
        setUser(responds.data.data.user);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <>
      <h1 className='text-5xl font-bold'>Login to personal account</h1>
      <TextOpacity className='text-2xl'>
        All your orders and personal information are here
      </TextOpacity>
      <form onSubmit={authSubmitHandler} className='p-3'>
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
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid password'
          autoComplete='off'
          onInput={inputHandler}
        />
        <Button disabled={!formState.isValid}>Login</Button>
      </form>
    </>
  );
};

export default LoginPage;
