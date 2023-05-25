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

  return (
    <>
      <ModalSearch
        show={showSearch}
        setShow={setShowSearch}
        header='Delete your account'
        icon={<MdOutlineMeetingRoom />}
        actions={val => props.setHall(val)}
      >
        <p>
          Ok, we get you clicked to delete you
          <br />
          <br />
          We'r not being dramatic but{' '}
          <span className='font-black'>there's no going back from it</span>, so
          do you really want to delete your account?
        </p>
      </ModalSearch>
      <div onClick={() => setShowSearch(true)}>{props.children}</div>
    </>
  );
};

export default HallSearch;
