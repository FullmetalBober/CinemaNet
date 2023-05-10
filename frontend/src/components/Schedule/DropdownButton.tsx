import TextOpacity from '../UI/TextOpacity';
import ArrowDown from '../UI/ArrowDown';

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
        props.afterWeek.includes(props.selectedDay) && 'bg-red-600'
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
        <ArrowDown
          active={props.afterWeek.includes(props.selectedDay)}
          className={`${props.isHover ? '!bg-red-500' : null}
            `}
        />
      </div>
    </div>
  );
};

export default DropdownButton;
