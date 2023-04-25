import { useState } from 'react';
import Modal from '../UI/Modal/Modal';

const ChooseCinema = () => {
  const [showCinemas, setShowCinemas] = useState(false);

  return (
    <>
      <Modal
        show={showCinemas}
        onCancel={() => setShowCinemas(false)}
      >
        <div className='flex justify-end'>
          <div>city</div>
          <div>cinema</div>
        </div>
      </Modal>

      <button
        onClick={() => setShowCinemas(true)}
        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      >
        CinemaCity, CinemaName
      </button>
    </>
  );
};

export default ChooseCinema;
