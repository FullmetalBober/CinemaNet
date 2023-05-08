import { RiCloseFill } from 'react-icons/ri';
import { ISeat } from '../../Interfaces';
import Currency from '../UI/Currency';

interface IProps {
  seat: ISeat;
  handleSelectSeat: (
    row: number,
    col: number,
    isLux: boolean,
    price: number
  ) => void;
}

const ShowtimeBuyCard = ({ seat, handleSelectSeat }: IProps) => {
  return (
    <div
      className={`rounded border p-4 ${
        seat.isLux ? 'border-red-500' : 'border-[#6caadf]'
      }`}
    >
      <div className='flex items-center justify-between'>
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
          <RiCloseFill
            onClick={() =>
              handleSelectSeat(seat.row, seat.col, seat.isLux, seat.price)
            }
            className='ml-3 cursor-pointer rounded-full bg-[#e9e9e9] text-2xl text-black hover:bg-[#d9d9d9]'
          />
        </div>
      </div>
    </div>
  );
};

export default ShowtimeBuyCard;
