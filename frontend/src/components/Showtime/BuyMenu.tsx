import { IBar, IGoods, ISeat } from '../../Interfaces';
import Currency from '../UI/Currency';
import ScrollbarDiv from '../UI/ScrollbarDiv';
import BuyMenuHeader from './BuyMenuHeader';
import ShowtimeBuySeatCard from './ShowtimeBuySeatCard';
import ShowtimeBuyGoodsCard from './ShowtimeBuyGoodsCard';
import Button from '../UI/Button';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../UI/Loading';
import { UserState } from '../../contexts/UserProvider';
import { useHttpClient } from '../../hooks/http-hook';

interface IProps {
  seats: ISeat[];
  isSeatsPage: boolean;
  setIsSeatsPage: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectSeat: (
    row: number,
    col: number,
    isLux: boolean,
    price: number
  ) => void;
  selectedGoods: IGoods[];
  handleSelectGoods: (goods: IBar, count: number) => void;
}

const BuyMenu = (props: IProps) => {
  const { sendRequest, isLoading } = useHttpClient();
  const { showtimeId } = useParams();
  const { user } = UserState();

  const priceSeats =
    Math.round(props.seats.reduce((sum, item) => sum + item.price, 0) * 100) /
    100;
  const priceGoods =
    Math.round(
      props.selectedGoods.reduce(
        (sum, item) => sum + item.bar.price * item.count,
        0
      ) * 100
    ) / 100;

  const handleClickButton = async () => {
    if (props.seats.length === 0) return;
    if (props.isSeatsPage) props.setIsSeatsPage(false);
    else {
      const body = {
        showtime: showtimeId,
        seats: props.seats,
        barOrders: props.selectedGoods.map(item => ({
          bar: item.bar._id,
          count: item.count,
        })),
      };

      const responseTicket = await sendRequest({
        url: `/api/v1/tickets`,
        method: 'POST',
        data: body,
        showErrMsg: true,
      });

      if (responseTicket?.data.status != 'success') return;

      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );

      const response = await sendRequest({
        url: `/api/v1/tickets/checkout-session/${responseTicket.data.data.data._id}`,
        showErrMsg: true,
      });

      const session = response?.data.session;
      await stripe?.redirectToCheckout({
        sessionId: session.id,
      });
    }
  };

  return (
    <div className='right-0 border-white/50 lg:fixed lg:w-[420px] lg:border-l'>
      <ScrollbarDiv className='mb-[120px] px-3 lg:mb-0 lg:h-[calc(100vh-204px)]'>
        <BuyMenuHeader
          title='Tickets'
          count={`${props.seats.length} tickets`}
          price={priceSeats}
        />
        <div className='flex flex-col gap-2'>
          {props.seats.map((seat, index) => (
            <ShowtimeBuySeatCard key={index} seat={seat} {...props} />
          ))}
        </div>
        <div>
          <BuyMenuHeader
            title='Bar goods'
            count={`${props.selectedGoods.reduce(
              (sum, item) => sum + item.count,
              0
            )} pcs`}
            price={priceGoods}
          />
          <div className='flex flex-col gap-2'>
            {props.selectedGoods.map((goods, index) => (
              <ShowtimeBuyGoodsCard key={index} goods={goods} {...props} />
            ))}
          </div>
        </div>
      </ScrollbarDiv>
      <div className='fixed bottom-0 left-0 w-full border-t border-white/50 bg-[#221f1f] p-6 text-xl lg:sticky'>
        <div className='flex justify-between'>
          <div>Total payable:</div>
          <div>
            <Currency>
              {Math.round((priceSeats + priceGoods) * 100) / 100}
            </Currency>
          </div>
        </div>
        <Button
          onClick={handleClickButton}
          disabled={props.seats.length === 0 || isLoading || !user._id}
        >
          {isLoading ? <Loading size={28} /> : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default BuyMenu;
