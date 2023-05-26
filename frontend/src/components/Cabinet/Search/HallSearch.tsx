import { useCallback, useEffect, useState } from 'react';
import ModalSearch from '../../UI/Modal/ModalSearch';
import { IHall } from '../../../Interfaces';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import axios from 'axios';
import Seats from '../../UI/Seats/Seats';
import ScrollbarDiv from '../../UI/ScrollbarDiv';
import { CinemaState } from '../../../contexts/CinemaProvider';

interface IProps {
  children: React.ReactNode;
  hall: IHall;
  setHall: React.Dispatch<React.SetStateAction<IHall>>;
}

const HallSearch = (props: IProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [halls, setHalls] = useState<IHall[]>([]);
  const [input, setInput] = useState<string>();
  const { cinema } = CinemaState();

  useEffect(() => {
    (async () => {
      try {
        let url = `/api/v1/halls?`;
        if (input) url += `search=${input}`;

        const response = await axios.get(
          url + `&sort=name&cinema=${cinema._id}`
        );
        setHalls(response.data.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [input, cinema._id]);

  const onInput = useCallback((_: string, val: string) => {
    setInput(val);
  }, []);

  const calculationSizeSeat = (hall: IHall) => {
    const maxCol = Math.max(...hall.seats.standard.map(seat => seat.seats));
    console.log(maxCol);
    const width = 159 / maxCol;
    return {
      width: `${width}px`,
      height: `${width + width * 0.6}px`,
    };
  };

  return (
    <>
      <ModalSearch
        show={showSearch}
        setShow={setShowSearch}
        header='Search hall'
        icon={<MdOutlineMeetingRoom />}
        onInput={onInput}
      >
        <ScrollbarDiv className='h-full divide-y-2 divide-white/10 p-2 scrollbar-track-stone-800 scrollbar-thumb-stone-700'>
          {halls.map(hall => (
            <div
              key={hall._id}
              className='cursor-pointer rounded p-2 transition hover:bg-white/5'
              onClick={() => {
                props.setHall(hall);
                setShowSearch(false);
              }}
            >
              <h2 className='text-center text-2xl font-bold'>{hall.name}</h2>
              <Seats hall={hall} cardSize={calculationSizeSeat(hall)} />
            </div>
          ))}
        </ScrollbarDiv>
      </ModalSearch>
      <div onClick={() => setShowSearch(true)}>{props.children}</div>
    </>
  );
};

export default HallSearch;
