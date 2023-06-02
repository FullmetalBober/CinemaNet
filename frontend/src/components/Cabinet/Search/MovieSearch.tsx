import { useCallback, useEffect, useState } from 'react';
import { IMovie } from '../../../Interfaces';
import ModalSearch from '../../UI/Modal/ModalSearch';
import { MdOutlineMovie } from 'react-icons/md';
import ScrollbarDiv from '../../UI/ScrollbarDiv';
import MovieCard from '../../UI/Cards/MovieCard';
import { useHttpClient } from '../../../hooks/http-hook';

interface IProps {
  children: React.ReactNode;
  movie: IMovie;
  setMovie: React.Dispatch<React.SetStateAction<IMovie>>;
}

const MovieSearch = (props: IProps) => {
  const { sendRequest } = useHttpClient();
  const [showSearch, setShowSearch] = useState(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [input, setInput] = useState<string>();

  useEffect(() => {
    (async () => {
      const response = await sendRequest({
        url: `/api/v1/movies`,
        params: {
          search: input,
          sort: 'name',
        },
        showErrMsg: true,
      });
      if (!response) return;

      setMovies(response.data.data.data);
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
