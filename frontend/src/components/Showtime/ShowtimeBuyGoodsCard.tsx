import Currency from '../UI/Currency';
import { IBar, IGoods } from '../../Interfaces';
import ShowtimeBuyCard from './ShowtimeBuyCard';
import CardClose from './CardClose';

interface IProps {
  goods: IGoods;
  handleSelectGoods: (goods: IBar, count: number) => void;
}

const ShowtimeBuyGoodsCard = ({ goods, handleSelectGoods }: IProps) => {
  return (
    <ShowtimeBuyCard className='border-white/50'>
      <div className='flex items-center'>
        <img
          className='w-[69px]'
          src={goods.bar.imageCover}
          alt={goods.bar.name}
        />
        <div className='ml-1'>
          <p>{goods.bar.name}</p>
          <p className='font-bold'>
            ({goods.count} pcs * <Currency>{goods.bar.price}</Currency>)
          </p>
        </div>
      </div>
      <div className='flex items-center font-bold'>
        <Currency>
          {Math.round(goods.bar.price * goods.count * 100) / 100}
        </Currency>
        <CardClose onClick={() => handleSelectGoods(goods.bar, 0)} />
      </div>
    </ShowtimeBuyCard>
  );
};

export default ShowtimeBuyGoodsCard;
