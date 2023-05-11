import { validate } from '../../util/validators';
import { useReducer, Reducer, useEffect } from 'react';
import Tooltip from './Tooltip';

interface IProps {
  type: string;
  label: string;
  id: string;
  value?: string;
  onInput?: (id: string, value: string, isValid: boolean) => void;
  className?: string;
  initialValid?: boolean;
  validators?: Validator[];
  element?: string;
  rows?: number;
  errorText?: string;
  autoComplete?: string;
}

interface State {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

interface Validator {
  type: string;
  val?: number;
}

interface ChangeAction {
  type: 'CHANGE';
  value: string;
  validators: Validator[];
}

interface TouchAction {
  type: 'TOUCH';
}

type Action = ChangeAction | TouchAction;

const inputReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props: IProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isValid: props.initialValid || false,
    isTouched: false,
  });

  useEffect(() => {
    props.onInput?.(props.id!, inputState.value, inputState.isValid);
  }, [props.onInput, props.id, inputState.value, inputState.isValid]);

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: 'CHANGE',
      value: event.target.value,
      validators: props.validators || [],
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder=' '
        autoComplete={props.autoComplete}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className={`peer w-[345px] border-b-2 border-white/50 bg-transparent px-2.5 pb-2.5 pt-4 text-xl text-slate-100 transition-colors focus:border-red-500 focus:outline-none ${props.className}`}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        placeholder=' '
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className={`w-full rounded-md border-2 border-gray-300 px-2 py-1 focus:border-red-500 focus:outline-none ${props.className}`}
      />
    );

  return (
    <div className='group relative flex flex-col items-center'>
      {element}
      <label
        htmlFor={props.id}
        className={`absolute -top-2 left-0 cursor-text px-2 text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-6 peer-focus:translate-y-0 ${
          inputState.isTouched && !inputState.isValid && 'text-red-500'
        }`}
      >
        {props.label}
      </label>
      {inputState.isTouched && !inputState.isValid && (
        <p className='absolute -bottom-6 left-2 text-left text-sm text-red-600'>
          {props.errorText}
        </p>
      )}
    </div>
  );
};

export default Input;
