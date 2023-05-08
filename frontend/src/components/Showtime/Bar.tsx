import { IBar } from '../../Interfaces';

interface IProps {
  goods: IBar[];
}

const Bar = (props: IProps) => {
  return (
    <div className='p-3'>
      <h1 className='py-3 text-xl font-semibold'>
        Buy goodies and 3D glasses online and pick up at the cinema bar.
      </h1>
      <div className='flex flex-wrap'>
        {props.goods.map(good => (
          <div key={good._id} className=''>
            <img src={good.imageCover} alt={good.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bar;
