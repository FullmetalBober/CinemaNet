import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IMovie } from '../../Interfaces';
import Loading from '../UI/Loading';
import TrailerMovie from './TrailerMovie';
import LeftSideMovie from './LeftSideMovie';
import CenterSideMovie from './CenterSideMovie';
import { useHttpClient } from '../../hooks/http-hook';

const Movie = () => {
  const { sendRequest } = useHttpClient();
  const { movieSlug } = useParams();
  const [movie, setMovie] = useState<IMovie>();
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await sendRequest({
        url: `/api/v1/movies/slug/${movieSlug}`,
        showErrMsg: true,
      });
      if (!response) return;
      setMovie(response.data.data.data);
    })();
  }, [movieSlug]);

  if (!movie) return <Loading />;
  if (showTrailer)
    return <TrailerMovie movie={movie} setShowTrailer={setShowTrailer} />;
  return (
    <main className='mx-auto mb-7 mt-7 flex gap-4 lg:max-w-screen-xl lg:px-9'>
      <LeftSideMovie movie={movie} setShowTrailer={setShowTrailer} />
      <CenterSideMovie movie={movie} />
    </main>
  );
};

export default Movie;
