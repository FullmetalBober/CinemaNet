import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../UI/Modal/Modal';
import ModalNav from './ModalNav';
import TextClick from '../UI/TextClick';

interface ICinema {
  _id: number;
  name: string;
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
  const [cities, setCities] = useState<string[]>([]);
  const [city, setCity] = useState<string>('');
  const [cityCinemas, setCityCinemas] = useState<ICinema[]>([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get('/api/v1/cinemas');
        setCinemas(response.data.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCinemas();
  }, []);

  useEffect(() => {
    const cityCinemas = cinemas.filter(cinema => cinema.location.city === city);
    setCityCinemas(cityCinemas);
  }, [city, cinemas]);

  useEffect(() => {
    const cities = cinemas.map(cinema => cinema.location.city);
    const uniqueCities = [...new Set(cities)];
    setCities(uniqueCities);
  }, [cinemas]);

  return (
    <>
      <Modal show={showCinemas} onCancel={() => setShowCinemas(false)}>
        <div className="flex justify-between h-screen child:p-10 text-3xl">
          <div className="w-1/3 bg-[#221f1f]">
            <ModalNav className="mb-5 font-extrabold">City</ModalNav>

            {cities.map((value, index) => (
              <TextClick
                key={index}
                className={`hover:text-[#ff0a14] mb-2 text-2xl ${
                  value === city && 'text-[#ff0a14]'
                }`}
                onClick={() => setCity(value)}
              >
                {value}
              </TextClick>
            ))}
          </div>
          <div className="w-2/3 bg-[rgba(238,242,245,.46)] text-black">
            <ModalNav className="mb-5 font-extrabold border-black">
              Cinema
            </ModalNav>

            {cityCinemas.map(cinema => (
              <div
                key={cinema._id}
                className="pb-4 mb-2 border-b border-slate-500"
              >
                <TextClick
                  className="hover:text-[#ff0a14]"
                  onClick={() => {
                    console.log(cinema);
                  }}
                >
                  {cinema.name}
                </TextClick>
                <p className="font-extrabold text-sm text-slate-500 font-mono">
                  {cinema.location.address}
                </p>
              </div>
            ))}
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
