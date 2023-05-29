import { validate } from '../../../utils/validators';
import { useReducer, Reducer, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

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
  ref?: any;
  disabled?: boolean;
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
  }, [inputState.value]);

  useEffect(() => {
    dispatch({
      type: 'CHANGE',
      value: props.value || '',
      validators: props.validators || [],
    });
  }, [props.value]);

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

  const elementClass =
    'peer border-b-2 border-white/50 bg-transparent px-2.5 pb-2.5 pt-4 text-xl text-slate-100 transition-colors focus:border-red-500 focus:outline-none';
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
        ref={props.ref}
        disabled={props.disabled}
        className={`w-[345px] ${elementClass} ${props.className}`}
      />
    ) : (
      <TextareaAutosize
        id={props.id}
        rows={props.rows || 3}
        placeholder=' '
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        ref={props.ref}
        disabled={props.disabled}
        className={`w-full resize-none ${elementClass} ${props.className}`}
      />
    );

  return (
    <div
      className={`group relative mb-1.5 mt-1.5 ${
        props.element === 'input' ? 'w-[345px]' : 'w-full'
      }`}
    >
      {element}
      <label
        htmlFor={props.id}
        className={`absolute -top-2 left-0 -z-10 px-2 text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-6 peer-focus:translate-y-0 ${
          props.disabled ?? 'cursor-text'
        } ${inputState.isTouched && !inputState.isValid && 'text-red-500'}`}
      >
        {props.label}
      </label>
      {inputState.isTouched && !inputState.isValid && (
        <p className='absolute right-0 top-0 text-left text-sm text-red-600'>
          {props.errorText}
        </p>
      )}
    </div>
  );
};

export default Input;
