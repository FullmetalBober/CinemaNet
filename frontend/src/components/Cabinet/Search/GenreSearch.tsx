import { useCallback, useEffect, useState } from 'react';
import { IGenre } from '../../../Interfaces';
import ModalSearch from '../../UI/Modal/ModalSearch';
import ScrollbarDiv from '../../UI/ScrollbarDiv';
import { FaNapster } from 'react-icons/fa';
import { useHttpClient } from '../../../hooks/http-hook';

interface IProps {
  children: React.ReactNode;
  index: number;
  setGenre: (genre: IGenre, index: number) => void;
}

const GenreSearch = (props: IProps) => {
  const { sendRequest } = useHttpClient();
  const [showSearch, setShowSearch] = useState(false);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [input, setInput] = useState<string>();

  useEffect(() => {
    (async () => {
      let url = `/api/v1/genres?`;
      if (input) url += `search=${input}`;

      const response = await sendRequest({
        url: url + `&sort=name`,
        showErrMsg: true,
      });
      if (!response) return;

      setGenres(response.data.data.data);
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
        header='Search genre'
        icon={<FaNapster />}
        onInput={onInput}
      >
        <ScrollbarDiv className='h-full divide-y-2 divide-white/10 p-2 scrollbar-track-stone-800 scrollbar-thumb-stone-700'>
          {genres.map(genre => (
            <div
              key={genre._id}
              className='cursor-pointer rounded p-2 transition hover:bg-white/5'
              onClick={() => {
                props.setGenre(genre, props.index);
                setShowSearch(false);
              }}
            >
              {genre.name}
            </div>
          ))}
        </ScrollbarDiv>
      </ModalSearch>
      <div onClick={() => setShowSearch(true)}>{props.children}</div>
    </>
  );
};

export default GenreSearch;
