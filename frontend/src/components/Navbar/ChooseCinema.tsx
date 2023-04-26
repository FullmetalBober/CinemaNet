import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../UI/Modal/Modal';
import ModalNav from './ModalNav';
import TextClick from '../UI/TextClick';

interface ICinema {
  _id: number;
  location: {
    city: string;
    address: string;
    description: string;
    coordinates: [number, number];
  };
}

const ChooseCinema = () => {
  const [showCinemas, setShowCinemas] = useState<boolean>(false);
  const [cinemas, setCinemas] = useState<ICinema[]>([]);
  const [city, setCity] = useState<string>('');

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const { data } = await axios.get(
          '/api/v1/cinemas'
        );
        setCinemas(data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCinemas();
  }, []);

  return (
    <>
      <Modal show={showCinemas} onCancel={() => setShowCinemas(false)}>
        <div className="flex justify-between h-screen child:p-10 text-2xl">
          <div className="w-1/3 bg-[#221f1f]">
            <ModalNav className="mb-5 font-extrabold">City</ModalNav>

            {cinemas.map(cinema => (
              <TextClick
                key={cinema._id}
                hoverColor="#ff0a14"
                onClick={() => {
                  cinema._id;
                  console.log(cinema._id);
                }}
              >
                {cinema.location.city}
              </TextClick>
            ))}
          </div>
          <div className="w-2/3 bg-[rgba(238,242,245,.46)] text-black">
            <ModalNav className="mb-5 font-extrabold">Cinema</ModalNav>
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
