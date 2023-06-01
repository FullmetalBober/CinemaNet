import { useEffect, useState } from 'react';
import Input from './Input';
import { RiCloseFill } from 'react-icons/ri';

interface IProps {
  onInput: (id: string, value: any, isValid: boolean) => void;
  id: string;
  label: string;
  value?: string[];
}

const DynamicInputs = (props: IProps) => {
  const [inputs, setInputs] = useState<string[]>([...(props.value ?? []), '']);

  const onInput = (id: string, value: string) => {
    const index = +id;
    const inputsCopy = [...inputs];
    inputsCopy[index] = value;
    setInputs(inputsCopy);
  };

  const handleDelete = (index: number) => {
    const inputsCopy = [...inputs];
    inputsCopy.splice(index, 1);
    setInputs(inputsCopy);
  };

  useEffect(() => {
    if (inputs[inputs.length - 1] !== '') setInputs([...inputs, '']);
    props.onInput(
      props.id,
      inputs.filter(input => input !== ''),
      true
    );
  }, [inputs]);

  return (
    <div className='grid grid-cols-2'>
      {inputs.map((data, index) => (
        <div key={index} className='flex'>
          <Input
            element='input'
            type='text'
            label={`${props.label}`}
            id={`${index}`}
            errorText={data}
            autoComplete='off'
            initialValid={true}
            value={data}
            onInput={onInput}
          />
          {inputs.length > 1 && index !== inputs.length - 1 && (
            <button type='button' onClick={() => handleDelete(index)}>
              <RiCloseFill className='text-3xl text-red-500' />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicInputs;
