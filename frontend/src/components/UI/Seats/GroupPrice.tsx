import PriceCard from './PriceCard';

interface IProps {
  standardPrice: number;
  luxPrice: number;
}

const GroupPriceCard = (props: IProps) => {
  return (
    <div className='flex justify-center gap-14'>
      <PriceCard
        title='GOOD'
        price={props.standardPrice}
        color='bg-[#95c7f4]'
      />
      <PriceCard title='SUPER LUX' price={props.luxPrice} color='bg-red-500' />
    </div>
  );
};

export default GroupPriceCard;
