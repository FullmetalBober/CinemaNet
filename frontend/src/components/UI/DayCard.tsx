import TextOpacity from './TextOpacity';

interface IProps {
  days: Date[];
  day: Date;
  selectedDay: Date;
  handleDayClick: (day: Date) => void;
}

const DayCard = (props: IProps) => {
  return (
    <div
      className={`text-center flex-1 py-2 mr-1 rounded cursor-pointer border border-white/10 hover:border-white duration-200 ${
        props.selectedDay === props.day && 'bg-red-500'
      }`}
      onClick={() => props.handleDayClick(props.day)}
    >
      <p className="text-sm font-bold">
        {props.day
          .toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
          .toUpperCase()}
      </p>
      <TextOpacity
        className={`text-[12px] ${
          props.selectedDay === props.day && 'text-white/100'
        }`}
      >
        {props.day
          .toLocaleDateString('en-GB', { weekday: 'long' })
          .toUpperCase()}
      </TextOpacity>
    </div>
  );
};

export default DayCard;
