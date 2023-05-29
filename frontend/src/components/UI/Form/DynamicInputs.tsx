import { useEffect, useState } from 'react';
import Input from './Input';
import { RiCloseFill } from 'react-icons/ri';

interface IProps {
  onInput: (id: string, value: any, isValid: boolean) => void;
  id: string;
  label: string;
}

const DynamicInputs = (props: IProps) => {
  const [inputs, setInputs] = useState<string[]>(['']);

  const onInput = (id: string, value: string) => {
    const index = +id;
    const genresCopy = [...inputs];
    genresCopy[index] = value;
    setInputs(genresCopy);
    props.onInput(id, genresCopy, true);
  };

  const handleDelete = (index: number) => {
    const genresCopy = [...inputs];
    genresCopy.splice(index, 1);
    setInputs(genresCopy);
  };

  useEffect(() => {
    if (inputs[inputs.length - 1] !== '') setInputs([...inputs, '']);
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
            <button onClick={() => handleDelete(index)}>
              <RiCloseFill className='text-3xl text-red-500' />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicInputs;
