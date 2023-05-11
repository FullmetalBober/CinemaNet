import { VALIDATOR_REQUIRE } from '../../util/validators';
import Input from '../UI/Input';
import TextOpacity from '../UI/TextOpacity';

const LoginPage = () => {
  return (
    <>
      <h1 className='text-5xl font-bold'>Login to personal account</h1>
      <TextOpacity className='text-2xl'>
        All your orders and personal information are here
      </TextOpacity>
      <form className='p-3'>
        <Input
          element='input'
          type='text'
          label='Name'
          id='name'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid name.'
          autoComplete='off'
        />
      </form>
    </>
  );
};

export default LoginPage;
