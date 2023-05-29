import { useEffect, useState } from 'react';
import Input from '../../UI/Form/Input';
import GenreSearch from '../Search/GenreSearch';
import { IGenre } from '../../../Interfaces';
import { RiCloseFill } from 'react-icons/ri';

interface IProps {
  onInput: (id: string, value: any, isValid: boolean) => void;
}

const MovieAddGenres = (props: IProps) => {
  const [genres, setGenres] = useState<IGenre[]>([{} as IGenre]);

  const handleSelect = (value: IGenre, index: number) => {
    if (genres.some(genre => genre._id === value._id)) return;
    const genresCopy = [...genres];
    genresCopy[index] = value;
    setGenres(genresCopy);
    props.onInput('genres', genresCopy, true);
  };

  const handleDelete = (index: number) => {
    const genresCopy = [...genres];
    genresCopy.splice(index, 1);
    setGenres(genresCopy);
  };

  useEffect(() => {
    if (genres[genres.length - 1]._id)
      setGenres(prevState => [...prevState, {} as IGenre]);
  }, [genres]);

  return (
    <div className='grid grid-cols-2'>
      {genres.map((data, index) => (
        <div key={index} className='flex'>
          <GenreSearch
            index={index}
            setGenre={genre => handleSelect(genre, index)}
          >
            <Input
              element='input'
              type='text'
              label='Genre'
              id='genre'
              errorText={data.name}
              autoComplete='off'
              initialValid={true}
              value={data.name}
              disabled={true}
              className='cursor-pointer'
            />
          </GenreSearch>
          {genres.length > 1 && data._id && (
            <button onClick={() => handleDelete(index)}>
              <RiCloseFill className='text-3xl text-red-500' />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieAddGenres;
