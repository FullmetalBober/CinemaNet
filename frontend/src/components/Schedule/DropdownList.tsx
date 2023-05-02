import ScrollbarDiv from '../UI/ScrollbarDiv';

interface IProps {
  afterWeek: Date[];
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
  handleDayClick: (day: Date) => void;
}

const DropdownList = (props: IProps) => {
  return (
    <ScrollbarDiv className="flex flex-col divide-y divide-black/10 absolute bg-white rounded w-64 h-72 right-0 scrollbar-thumb-red-500">
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
          className="text-black text-sm p-2 cursor-pointer hover:text-red-500 child:hover:text-red-500 duration-200"
        >
          {day
            .toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            })
            .toLowerCase()}{' '}
          <span className="text-black/60">
            ({day.toLocaleDateString('en-GB', { weekday: 'long' })})
          </span>
        </div>
      ))}
    </ScrollbarDiv>
  );
};

export default DropdownList;
