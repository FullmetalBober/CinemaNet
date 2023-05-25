import { useState } from 'react';
import ModalSearch from '../UI/Modal/ModalSearch';
import { IHall } from '../../Interfaces';
import { MdOutlineMeetingRoom } from 'react-icons/md';

interface IProps {
  children: React.ReactNode;
  hall: IHall;
  setHall: React.Dispatch<React.SetStateAction<IHall>>;
}

const HallSearch = (props: IProps) => {
  const [showSearch, setShowSearch] = useState(false);

  const onInput = (id: string, val: string) => {
    console.log(val); //TODO: /api/v1/halls?search=val
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
        qwe
      </ModalSearch>
      <div onClick={() => setShowSearch(true)}>{props.children}</div>
    </>
  );
};

export default HallSearch;
