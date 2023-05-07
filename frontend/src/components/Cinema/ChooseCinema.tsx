import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../UI/Modal/Modal';
import { ICinema } from '../../Interfaces';
import { CinemaState } from '../../contexts/CinemaProvider';
import Cookies from 'universal-cookie';
import CitiesModal from './CitiesModal';
import CinemasModal from './CinemasModal';
import Loading from '../UI/Loading';
import { RiCloseFill } from 'react-icons/ri';

const ChooseCinema = () => {
  const [showCinemas, setShowCinemas] = useState<boolean>(false);
  const [cinemas, setCinemas] = useState<ICinema[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [cityCinemas, setCityCinemas] = useState<ICinema[]>([]);
  const { cinema, setCinema } = CinemaState();
  const [city, setCity] = useState<string>('');

  useEffect(() => {
    setCity(cinema.location.city);
  }, [cinema]);

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

  const handleCityClick = (city: string) => {
    setCity(city);
  };

  const handleCinemaClick = (cinema: ICinema) => {
    setCinema(cinema);
    const cookies = new Cookies();
    cookies.set('CinemaNet: cinema._id', cinema._id, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    setShowCinemas(false);
  };

  return (
    <>
      <Modal show={showCinemas} onCancel={() => setShowCinemas(false)}>
        <div className="flex h-screen justify-between text-3xl child:p-10">
          <CitiesModal city={city} cities={cities} onClick={handleCityClick} />

          <CinemasModal
            cityCinemas={cityCinemas}
            handleCinemaClick={handleCinemaClick}
          />
        </div>
        <RiCloseFill
          onClick={() => setShowCinemas(false)}
          className="fixed right-0 top-0 m-4 h-[40px] w-[40px] cursor-pointer text-black"
        />
      </Modal>

      <button onClick={() => setShowCinemas(true)}>
        {cinema._id === '' ? (
          <Loading />
        ) : (
          <>
            {cinema.location.city}, {cinema.name}
          </>
        )}
      </button>
    </>
  );
};

export default ChooseCinema;
