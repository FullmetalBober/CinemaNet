import { ISeat } from '../../Interfaces';
import Currency from '../UI/Currency';
import ScrollbarDiv from '../UI/ScrollbarDiv';
import TextOpacity from '../UI/TextOpacity';
import ShowtimeBuyCard from './ShowtimeBuyCard';

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
}

const BuyMenu = (props: IProps) => {
  const handleClickButton = () => {
    if (props.seats.length === 0) return;
    if (props.isSeatsPage) props.setIsSeatsPage(false);
  };

  return (
    <div className='right-0 border-white/50 lg:fixed lg:w-[420px] lg:border-l'>
      <ScrollbarDiv className='mb-[120px] px-3 lg:mb-0 lg:h-[calc(100vh-204px)]'>
        <div className='flex justify-between py-2'>
          <h1 className='text-2xl'>Tickets</h1>
          <TextOpacity>
            {props.seats.length} tickets,{' '}
            <Currency>
              {Math.round(
                props.seats.reduce((sum, item) => sum + item.price, 0) * 100
              ) / 100}
            </Currency>
          </TextOpacity>
        </div>
        <div className='flex flex-col gap-2'>
          {props.seats.map((seat, index) => (
            <ShowtimeBuyCard key={index} seat={seat} {...props} />
          ))}
        </div>
        <div>
          <h1 className='text-2xl'>Bar goods</h1>
        </div>
      </ScrollbarDiv>
      <div className='fixed bottom-0 left-0 w-full border-t border-white/50 bg-[#221f1f] p-6 text-xl lg:sticky'>
        <div className='flex justify-between'>
          <div>Total payable:</div>
          <div>
            <Currency>
            {Math.round(
              props.seats.reduce((sum, item) => sum + item.price, 0) * 100
            ) / 100}
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
