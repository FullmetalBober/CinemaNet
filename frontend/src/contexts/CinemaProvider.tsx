import { createContext, useContext, useEffect, useState } from 'react';
import { ICinema } from '../Interfaces';
import Cookies from 'universal-cookie';
import axios from 'axios';

interface CinemaContextType {
  cinema: ICinema;
  setCinema: React.Dispatch<React.SetStateAction<ICinema>>;
}

interface IProps {
  children: React.ReactNode;
}

const CinemaDefault = {
  _id: '',
  name: '',
  location: {
    city: '',
  },
} as ICinema;

const CinemaContext = createContext<CinemaContextType>({} as CinemaContextType);

const CinemaProvider = (props: IProps) => {
  const [cinema, setCinema] = useState<ICinema>(CinemaDefault as ICinema);

  useEffect(() => {
    const cookies = new Cookies();
    const cinemaId = cookies.get('CinemaNet: cinema._id');
    (async () => {
      if (cinemaId) {
        const response = await axios.get(`/api/v1/cinemas/${cinemaId}`);
        setCinema(response.data.data.data);
      } else {
        const response = await axios.get('/api/v1/cinemas?limit=1');
        setCinema(response.data.data.data[0]);

        cookies.set('CinemaNet: cinema._id', response.data.data.data[0]._id, {
          path: '/',
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });
      }
    })();
  }, []);
  return (
    <CinemaContext.Provider
      value={{
        cinema,
        setCinema,
      }}
    >
      {props.children}
    </CinemaContext.Provider>
  );
};

export const CinemaState = () => {
  return useContext(CinemaContext);
};

export default CinemaProvider;
