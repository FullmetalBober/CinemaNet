import { CinemaState } from '../../contexts/CinemaProvider';
import Circle from '../UI/Circle';
import TextOpacity from '../UI/TextOpacity';
import { IoLocationOutline } from 'react-icons/io5';
import { HiOutlinePhone } from 'react-icons/hi';
import Loading from '../UI/Loading';

const Schedule = () => {
  const { cinema } = CinemaState();

  if (!cinema.imageCover) return <Loading />;
  return (
    <div className="lg:max-w-screen-xl lg:px-9 mx-auto mt-7">
      <div
        style={{ backgroundImage: `url(${cinema.imageCover})` }}
        className={`bg-center bg-cover`}
      >
        <div className={`bg-[url('images/cinema/tv.png')]`}>
          <div className="pt-[10rem]">
            <h1 className="font-extrabold text-6xl text-center">
              {cinema.name}
            </h1>
            <div className="flex justify-between mt-5">
              <div className="flex justify-center items-center p-8">
                <Circle className="mr-4">
                  <IoLocationOutline color="white" size={27} />
                </Circle>
                <div>
                  <p className="font-bold text-2xl">
                    {cinema.location.address}
                  </p>
                  <TextOpacity>{cinema.location.city}</TextOpacity>
                </div>
              </div>
              <div className="flex items-center p-8">
                <TextOpacity>Contact center</TextOpacity>
                <Circle className="ml-4">
                  <HiOutlinePhone color="white" size={27} />
                </Circle>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
