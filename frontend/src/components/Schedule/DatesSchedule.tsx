import TextOpacity from '../UI/TextOpacity';
import { useEffect, useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import Loading from '../UI/Loading';

interface IProps {
  days: Date[];
  selectedDay: Date;
  handleDayClick: (day: Date) => void;
}

const DatesSchedule = (props: IProps) => {
  const [week, setWeek] = useState<Date[]>([]);
  const [afterWeek, setAfterWeek] = useState<Date[]>([]);
  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    if (props.days.length === 0) return;
    const week = [];
    const afterWeek = [];
    for (let i = 0; i < props.days.length; i++) {
      if (i < 7) week.push(props.days[i]);
      else afterWeek.push(props.days[i]);
    }
    setWeek(week);
    setAfterWeek(afterWeek);
  }, [props.days]);

  if (props.days.length === 0) return <Loading />;
  return (
    <div>
      <div className="flex justify-between items-center">
        {week.map((day, index) => (
          <div
            key={index}
            className={`text-center flex-1 py-2 mr-1 rounded cursor-pointer border border-white/10 hover:border-white duration-200 ${
              props.selectedDay === day && 'bg-red-500'
            }`}
            onClick={() => props.handleDayClick(day)}
          >
            <p className="text-sm font-bold">
              {day
                .toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                .toUpperCase()}
            </p>
            <TextOpacity
              className={`text-[12px] ${
                props.selectedDay === day && 'text-white'
              }`}
            >
              {day
                .toLocaleDateString('en-GB', { weekday: 'long' })
                .toUpperCase()}
            </TextOpacity>
          </div>
        ))}
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="text-center flex-[1.2] px-4 py-2 rounded cursor-pointer border border-white/10 hover:border-white duration-200"
        >
          <div className="flex justify-between items-center text-left">
            <div>
              <p className="text-sm font-bold">TO CHOOSE</p>
              <TextOpacity className="text-[12px]">DAY</TextOpacity>
            </div>
            <IoIosArrowDropdownCircle
              className={`text-4xl ${
                isHover ? 'text-red-500' : 'text-white/10'
              }`}
            />
          </div>
        </div>
        {/* {afterWeek.map((day, index) => (
            <div key={index} className='text-black'>
              {day.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
              })}{' '}
              <span className='text-grey-500\50'>
                ({day.toLocaleDateString('en-GB', { weekday: 'long' })})
              </span>
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default DatesSchedule;
