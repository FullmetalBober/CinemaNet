import { createContext, useContext, useEffect, useState } from 'react';
import { ICinema } from '../Interfaces';
import Cookies from 'universal-cookie';
import { useHttpClient } from '../hooks/http-hook';

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
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const cookies = new Cookies();
    const cinemaId = cookies.get('CinemaNet: cinema._id');

    (async () => {
      let url = '/api/v1/cinemas';
      if (cinemaId) url += `/${cinemaId}`;
      else url += '?limit=1';

      const response = await sendRequest({
        url,
        showErrMsg: true,
      });
      let cinema;
      if (Array.isArray(response?.data.data.data))
        cinema = response?.data.data.data[0];
      else cinema = response?.data.data.data;
      if (!cinema) return;

      setCinema(cinema);
      cookies.set('CinemaNet: cinema._id', cinema._id, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
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
