import { useState } from 'react';
import Modal from '../UI/Modal/Modal';
import ModalNav from './ModalNav';

const ChooseCinema = () => {
  const [showCinemas, setShowCinemas] = useState(false);

  return (
    <>
      <Modal show={showCinemas} onCancel={() => setShowCinemas(false)}>
        <div className="flex justify-between h-screen child:p-10">
          <div className="w-1/3 bg-[#221f1f]">
            <ModalNav>City</ModalNav>
          </div>
          <div className="w-2/3 bg-[rgba(238,242,245,.46)] text-black">
            <ModalNav className='border-black'>Cinema</ModalNav>
          </div>
        </div>
      </Modal>

      <button onClick={() => setShowCinemas(true)}>
        CinemaCity, CinemaName
      </button>
    </>
  );
};

export default ChooseCinema;
