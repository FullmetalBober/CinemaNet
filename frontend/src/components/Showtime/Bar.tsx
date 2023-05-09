import { BsPlusLg } from 'react-icons/bs';
import { IBar, IGoods } from '../../Interfaces';
import Currency from '../UI/Currency';
import { AiOutlineMinus } from 'react-icons/ai';
import TextOpacity from '../UI/TextOpacity';
import BarIcon from './BarIcon';

interface IProps {
  goods: IBar[];
  selectedGoods: IGoods[];
  handleSelectGoods: (goods: IBar, count: number) => void;
}

const Bar = (props: IProps) => {
  return (
    <div className='p-3'>
      <h1 className='py-3 text-xl font-semibold'>
        Buy goodies and 3D glasses online and pick up at the cinema bar.
      </h1>
      <div className='flex flex-wrap gap-2'>
        {props.goods.map(good => {
          const selectedCount =
            props.selectedGoods.find(item => item.bar._id === good._id)
              ?.count || 0;

          return (
            <div
              key={good._id}
              className='w-[139px] rounded border border-white/50 p-2 lg:w-[163px]'
            >
              <img src={good.imageCover} alt={good.name} loading='lazy' />
              <div className='flex min-h-[80px] items-center text-center font-semibold'>
                {good.name}
              </div>
              <div className='border-t border-white/50 bg-[#221f1f] py-1 text-center font-semibold'>
                <Currency>{good.price}</Currency>
                <div className='grid grid-cols-3'>
                  <BarIcon
                    onClick={() =>
                      props.handleSelectGoods(good, selectedCount - 1)
                    }
                  >
                    <AiOutlineMinus className='text-2xl' />
                  </BarIcon>
                  <TextOpacity
                    className={`flex items-center justify-center text-2xl ${
                      selectedCount > 0 ? '!text-red-500' : null
                    }`}
                  >
                    {selectedCount}
                  </TextOpacity>
                  <BarIcon
                    onClick={() =>
                      props.handleSelectGoods(good, selectedCount + 1)
                    }
                  >
                    <BsPlusLg className='text-2xl' />
                  </BarIcon>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bar;
