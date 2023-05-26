import { useCallback, useEffect, useState } from 'react';
import { IMovie } from '../../../Interfaces';
import axios from 'axios';
import ModalSearch from '../../UI/Modal/ModalSearch';
import { MdOutlineMovie } from 'react-icons/md';
import ScrollbarDiv from '../../UI/ScrollbarDiv';
import MovieCard from '../../UI/Cards/MovieCard';

interface IProps {
  children: React.ReactNode;
  movie: IMovie;
  setMovie: React.Dispatch<React.SetStateAction<IMovie>>;
}

const MovieSearch = (props: IProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [input, setInput] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `/api/v1/movies?search=${input}&sort=name`
        );
        setMovies(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [input]);

  const onInput = useCallback((_: string, val: string) => {
    setInput(val);
  }, []);

  return (
    <>
      <ModalSearch
        show={showSearch}
        setShow={setShowSearch}
        header='Search movie'
        icon={<MdOutlineMovie />}
        onInput={onInput}
      >
        <ScrollbarDiv className='h-full divide-y-2 divide-white/10 p-2 scrollbar-track-stone-800 scrollbar-thumb-stone-700'>
          {movies.map(movie => (
            <div
              key={movie._id}
              className='cursor-pointer rounded p-2 transition hover:bg-white/5'
              onClick={() => {
                props.setMovie(movie);
                setShowSearch(false);
              }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </ScrollbarDiv>
      </ModalSearch>
      <div onClick={() => setShowSearch(true)}>{props.children}</div>
    </>
  );
};

export default MovieSearch;
