import { InputData } from '../../hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../utils/validators';
import Button from '../UI/Button';
import Input from '../UI/Form/Input';
import TextOpacity from '../UI/TextOpacity';
import { UserState } from '../../contexts/UserProvider';
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

const LoginPage = ({ inputHandler, formState }: IProps) => {
  const { sendRequest, isLoading } = useHttpClient();
  const { setUser } = UserState();
  const navigate = useNavigate();

  const authSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      const data = {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      };
      const responds = await sendRequest({
        url: '/api/v1/users/login',
        method: 'POST',
        data,
        showSuccessMsg: 'Login successfully',
        showErrMsg: true,
      });
      setUser(responds?.data.data.user);
      navigate('/');
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
        <Button disabled={!formState.isValid || isLoading}>
          {isLoading ? <Loading size={28} /> : 'Login'}
        </Button>
      </form>
    </>
  );
};

export default LoginPage;
