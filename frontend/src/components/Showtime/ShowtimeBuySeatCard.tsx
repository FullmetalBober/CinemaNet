import { ISeat } from '../../Interfaces';
import Currency from '../UI/Currency';
import ShowtimeBuyCard from './ShowtimeBuyCard';
import CardClose from './CardClose';

interface IProps {
  seat: ISeat;
  handleSelectSeat: (
    row: number,
    col: number,
    isLux: boolean,
    price: number
  ) => void;
}

const ShowtimeBuySeatCard = ({ seat, handleSelectSeat }: IProps) => {
  return (
    <ShowtimeBuyCard
      className={seat.isLux ? 'border-red-500' : 'border-[#6caadf]'}
    >
      <span>{seat.row} row</span>
      <span>
        {seat.col} seat <strong>{seat.isLux ? 'SUPER LUX' : 'GOOD'}</strong>
      </span>
      <div className='flex items-center'>
        <span>
          <Currency>
            <strong>{seat.price}</strong>
          </Currency>
        </span>
        <CardClose
          onClick={() =>
            handleSelectSeat(seat.row, seat.col, seat.isLux, seat.price)
          }
        />
      </div>
    </ShowtimeBuyCard>
  );
};

export default ShowtimeBuySeatCard;
