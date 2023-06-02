import { useState } from 'react';
import {
  VALIDATOR_EQUAL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../utils/validators';
import Input from '../../UI/Form/Input';
import { useForm } from '../../../hooks/form-hook';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';
import { useHttpClient } from '../../../hooks/http-hook';

const CabinetPassword = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      passwordCurrent: {
        value: null,
        isValid: false,
      },
      password: {
        value: null,
        isValid: false,
      },
      passwordConfirm: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  const changePasswordSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      const body: { [key: string]: any } = {};
      Object.entries(formState.inputs).forEach(([key, el]) => {
        if (key === 'imageCover') return;
        body[key] = el.value;
      });

      await sendRequest({
        url: '/api/v1/users/updateMyPassword',
        method: 'PATCH',
        data: body,
        showSuccessMsg: 'Password changed successfully!',
        showErrMsg: true,
      });

      Object.entries(formState.inputs).forEach(([key, el]) => {
        el.value = null;
        el.isValid = false;
      });
    })();
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='mb-2 text-3xl font-medium'>YOUR PASSWORD SETTINGS</h1>

      <form
        onSubmit={changePasswordSubmitHandler}
        className='flex flex-col gap-3'
      >
        <Input
          element='input'
          type='password'
          label='Current password'
          id='passwordCurrent'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid password'
          autoComplete='off'
          onInput={inputHandler}
          value={formState.inputs.passwordCurrent.value}
        />

        <Input
          element='input'
          type='password'
          label='New password'
          id='password'
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
          errorText='Please enter a valid password'
          autoComplete='off'
          onInput={inputHandler}
          value={formState.inputs.password.value}
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
          value={formState.inputs.passwordConfirm.value}
        />

        <Button disabled={!formState.isValid || isLoading}>
          {isLoading ? <Loading size={28} /> : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default CabinetPassword;
