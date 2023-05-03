import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IMovie } from '../../Interfaces';
import axios from 'axios';
import Loading from '../UI/Loading';

const Movie = () => {
  const { movieSlug } = useParams();
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/v1/movies/slug/${movieSlug}`);
        setMovie(response.data.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [movieSlug]);

  if (!movie) return <Loading />;
  
  return <div>Movie</div>;
};

export default Movie;
