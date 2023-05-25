import Currency from '../UI/Currency';
import ShowtimeSeatCard from '../UI/Seats/ShowtimeSeatCard';

interface IProps {
  title: string;
  price: number;
  color: string;
}

const ShowtimeMainPriceCard = (props: IProps) => {
  return (
    <div className='flex items-center'>
      <ShowtimeSeatCard className={`mr-2 ${props.color}`} />
      <div className='flex flex-col text-sm/4 font-semibold'>
        <span>{props.title}</span>
        <span>
          - <Currency>{props.price}</Currency>
        </span>
      </div>
    </div>
  );
};

export default ShowtimeMainPriceCard;
