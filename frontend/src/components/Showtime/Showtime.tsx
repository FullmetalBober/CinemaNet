import { Suspense, lazy, useEffect, useState } from 'react';
import SeatsPage from './SeatsPage';
import { IBar, IGoods, ISeat, IShowtime } from '../../Interfaces';
import { useParams } from 'react-router-dom';
import Loading from '../UI/Loading';
import BuyMenu from './BuyMenu';
import ShowtimeInfo from './ShowtimeInfo';
import NavBuyMenu from './NavBuyMenu';
import Toast from '../UI/Toast';
import { UserState } from '../../contexts/UserProvider';
import { useHttpClient } from '../../hooks/http-hook';
const Bar = lazy(() => import('./Bar'));

const Showtime = () => {
  const { sendRequest } = useHttpClient();
  const { showtimeId } = useParams();
  const { user } = UserState();
  const [showtime, setShowtime] = useState<IShowtime>();
  const [isSeatsPage, setIsSeatsPage] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([]);
  const [goods, setGoods] = useState<IBar[]>([]);
  const [selectedGoods, setSelectedGoods] = useState<IGoods[]>([]);

  useEffect(() => {
    (async () => {
      const response = await sendRequest({
        url: `/api/v1/showtimes/${showtimeId}`,
        showErrMsg: true,
      });
      if (!response) return;
      setShowtime(response.data.data.data);
    })();
  }, [showtimeId]);

  useEffect(() => {
    if (!showtime) return;
    (async () => {
      const response = await sendRequest({
        url: `/api/v1/bars`,
        params: {
          cinema: showtime.hall.cinema._id,
          sort: 'name',
        },
        showErrMsg: true,
      });
      if (!response) return;

      setGoods(response.data.data.data);
    })();
  }, [showtime]);

  const handleSelectSeat = (
    row: number,
    col: number,
    isLux: boolean,
    price: number
  ) => {
    if (!user._id) {
      Toast({
        type: 'warn',
        message: 'You must be authorized before purchasing',
        duration: 1000,
      });
      return;
    }

    setSelectedSeats(prevState => {
      const index = prevState.findIndex(
        seat => seat.row === row && seat.col === col
      );
      if (index === -1) return [...prevState, { row, col, isLux, price }];
      else {
        const filteredSeats = prevState.filter(
          seat => seat.row !== row || seat.col !== col
        );
        if (filteredSeats.length === 0) setIsSeatsPage(true);
        return prevState.filter(seat => seat.row !== row || seat.col !== col);
      }
    });
  };

  const handleSelectGoods = (bar: IBar, count: number) => {
    setSelectedGoods(prevState => {
      if (count < 0) return prevState;
      const index = prevState.findIndex(item => item.bar._id === bar._id);
      if (index === -1)
        return [
          ...prevState,
          {
            bar,
            count,
          },
        ];
      else {
        const updatedState = [...prevState];
        updatedState[index].count = count;
        if (updatedState[index].count < 1)
          return updatedState.filter(
            item => item.bar._id !== updatedState[index].bar._id
          );
        return updatedState;
      }
    });
  };

  if (!showtime) return <Loading />;
  return (
    <>
      <NavBuyMenu
        selectedSeats={selectedSeats}
        isSeatsPage={isSeatsPage}
        setIsSeatsPage={setIsSeatsPage}
      />
      <main className='m-3 flex flex-col justify-between lg:flex-row'>
        <div className='flex-grow'>
          <ShowtimeInfo showtime={showtime} />
          {isSeatsPage ? (
            <SeatsPage
              showtime={showtime}
              selectedSeats={selectedSeats}
              handleSelectSeat={handleSelectSeat}
            />
          ) : (
            <Suspense fallback={<Loading />}>
              <Bar
                goods={goods}
                handleSelectGoods={handleSelectGoods}
                selectedGoods={selectedGoods}
              />
            </Suspense>
          )}
        </div>
        <div className='shrink-0 lg:w-[420px]'>
          <BuyMenu
            seats={selectedSeats}
            isSeatsPage={isSeatsPage}
            setIsSeatsPage={setIsSeatsPage}
            handleSelectSeat={handleSelectSeat}
            selectedGoods={selectedGoods}
            handleSelectGoods={handleSelectGoods}
          />
        </div>
      </main>
    </>
  );
};

export default Showtime;
