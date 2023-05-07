import ShowtimeSeatCard from './ShowtimeSeatCard';

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
          - <small>$</small>
          {props.price}
        </span>
      </div>
    </div>
  );
};

export default ShowtimeMainPriceCard;
