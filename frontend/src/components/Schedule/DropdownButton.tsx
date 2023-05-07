import { IoIosArrowDropdownCircle } from 'react-icons/io';
import TextOpacity from '../UI/TextOpacity';

interface IProps {
  selectedDay: Date;
  isHover: boolean;
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  afterWeek: Date[];
}

const DropdownButton = (props: IProps) => {
  return (
    <div
      onMouseEnter={() => props.setIsHover(true)}
      onMouseLeave={() => props.setIsHover(false)}
      onClick={() => props.setIsClicked(true)}
      className={`cursor-pointer rounded border border-white/10 px-4 py-2 text-center duration-200 hover:border-white ${
        props.afterWeek.includes(props.selectedDay) && 'bg-red-500'
      }`}
    >
      <div className='flex items-center justify-between text-left'>
        <div>
          {props.afterWeek.includes(props.selectedDay) ? (
            <>
              <p className='text-sm font-bold'>
                {props.selectedDay
                  .toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })
                  .toUpperCase()}
              </p>
              <p className='text-[12px] text-white'>
                {props.selectedDay
                  .toLocaleDateString('en-GB', { weekday: 'long' })
                  .toUpperCase()}
              </p>
            </>
          ) : (
            <>
              <p className='text-sm font-bold'>TO CHOOSE</p>
              <TextOpacity className='text-[12px]'>DAY</TextOpacity>
            </>
          )}
        </div>
        <IoIosArrowDropdownCircle
          className={`text-4xl ${
            props.isHover ? 'text-red-500' : 'text-white/50'
          } ${props.afterWeek.includes(props.selectedDay) && 'text-white/100'}
            }`}
        />
      </div>
    </div>
  );
};

export default DropdownButton;
