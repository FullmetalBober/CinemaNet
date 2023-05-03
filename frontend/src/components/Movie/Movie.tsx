import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IMovie } from '../../Interfaces';
import axios from 'axios';
import Loading from '../UI/Loading';
import TrailerMovie from './TrailerMovie';
import LeftSideMovie from './LeftSideMovie';
import CenterSideMovie from './CenterSideMovie';

const Movie = () => {
  const { movieSlug } = useParams();
  const [movie, setMovie] = useState<IMovie>();
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

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
  return (
    <>
      {showTrailer && (
        <TrailerMovie movie={movie} setShowTrailer={setShowTrailer} />
      )}
      <div className="mx-auto mb-7 mt-7 flex gap-4 lg:max-w-screen-xl lg:px-9">
        <LeftSideMovie movie={movie} setShowTrailer={setShowTrailer} />
        <CenterSideMovie movie={movie} />
      </div>
    </>
  );
};

export default Movie;
