import ScrollbarDiv from '../UI/ScrollbarDiv';

interface IProps {
  afterWeek: Date[];
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
  handleDayClick: (day: Date) => void;
}

const DropdownList = (props: IProps) => {
  return (
    <ScrollbarDiv className='absolute right-0 flex max-h-72 w-64 flex-col divide-y divide-black/10 rounded bg-white scrollbar-thumb-red-500'>
      {props.afterWeek.map((day, index) => (
        <div
          key={index}
          onMouseEnter={() => props.setIsHover(true)}
          onMouseLeave={() => props.setIsHover(false)}
          onClick={() => {
            props.setIsClicked(false);
            props.setIsHover(false);
            props.handleDayClick(day);
          }}
          className='cursor-pointer p-2 text-sm text-black duration-200 hover:text-red-500 child:hover:text-red-500'
        >
          {day
            .toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            })
            .toLowerCase()}{' '}
          <span className='text-black/60'>
            ({day.toLocaleDateString('en-GB', { weekday: 'long' })})
          </span>
        </div>
      ))}
    </ScrollbarDiv>
  );
};

export default DropdownList;
