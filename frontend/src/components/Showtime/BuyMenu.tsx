import { RiCloseFill } from 'react-icons/ri';
import { IBar, IGoods, ISeat } from '../../Interfaces';
import Currency from '../UI/Currency';
import ScrollbarDiv from '../UI/ScrollbarDiv';
import BuyMenuHeader from './BuyMenuHeader';
import ShowtimeBuySeatCard from './ShowtimeBuySeatCard';
import ShowtimeBuyGoodsCard from './ShowtimeBuyGoodsCard';

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

  const handleClickButton = () => {
    if (props.seats.length === 0) return;
    if (props.isSeatsPage) props.setIsSeatsPage(false);
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
        <button
          onClick={handleClickButton}
          className={`mt-2 w-full rounded bg-red-500 py-2 text-white transition ${
            props.seats.length === 0
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-red-700'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BuyMenu;
