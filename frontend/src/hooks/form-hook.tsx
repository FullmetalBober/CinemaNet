import { useReducer, Reducer, useCallback } from 'react';

interface InputData {
  [key: string]: {
    value: string;
    isValid: boolean;
  };
}

interface State {
  inputs: InputData;
  isValid: boolean;
}

interface ChangeAction {
  type: 'INPUT_CHANGE';
  inputId: string;
  value: string;
  isValid: boolean;
}

interface SetDataAction {
  type: 'SET_DATA';
  inputs: InputData;
  formIsValid: boolean;
}

type Action = ChangeAction | SetDataAction;

const formReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) continue;
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: InputData,
  initialFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value,
        isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback(
    (inputData: InputData, formValidity: boolean) => {
      dispatch({
        type: 'SET_DATA',
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );

  return [formState, inputHandler, setFormData] as const;
};
