import { FaPlay } from 'react-icons/fa';
import { IMovie } from '../../Interfaces';

interface IProps {
  movie: IMovie;
  setShowTrailer: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftSideMovie = (props: IProps) => {
  return (
    <div>
      <div
        className="cover center h-[369px] w-[250px] rounded-md"
        style={{
          backgroundImage: `url(${props.movie.imageCover})`,
        }}
      />
      <div
        onClick={() => props.setShowTrailer(true)}
        className="mt-3 flex cursor-pointer items-center justify-center rounded bg-white/20 py-3 text-xl font-semibold transition duration-200 hover:bg-red-500"
      >
        <FaPlay className="mr-2 text-white" /> Watch the trailer
      </div>
    </div>
  );
};

export default LeftSideMovie;
