import { useEffect, useRef, useState } from 'react';
import Loading from '../UI/Loading';
import ScrollbarDiv from '../UI/ScrollbarDiv';
import DayCard from '../UI/DayCard';
import DropdownButton from './DropdownButton';
import DropdownList from './DropdownList';

interface IProps {
  days: Date[];
  selectedDay: Date;
  handleDayClick: (day: Date) => void;
  className?: string;
}

const DatesSchedule = (props: IProps) => {
  const [week, setWeek] = useState<Date[]>([]);
  const [afterWeek, setAfterWeek] = useState<Date[]>([]);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const refChoose = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isClicked) return;
    document.addEventListener('click', handleChooseOutsideClick);
  }, [isClicked]);

  const handleChooseOutsideClick = (event: MouseEvent) => {
    if (
      refChoose.current &&
      !refChoose.current.contains(event.target as Node)
    ) {
      setIsClicked(false);
      document.removeEventListener('click', handleChooseOutsideClick);
    }
  };

  if (props.days.length === 0) return <Loading />;
  return (
    <div className={`flex justify-between items-center ${props.className}`}>
      {week.map((day, index) => (
        <DayCard
          key={index}
          days={props.days}
          day={day}
          selectedDay={props.selectedDay}
          handleDayClick={props.handleDayClick}
        />
      ))}

      <div ref={refChoose} className="flex-[1.4] relative">
        <DropdownButton
          isHover={isHover}
          setIsHover={setIsHover}
          setIsClicked={setIsClicked}
          afterWeek={afterWeek}
          selectedDay={props.selectedDay}
        />
        {isClicked && (
          <DropdownList
            afterWeek={afterWeek}
            setIsClicked={setIsClicked}
            setIsHover={setIsHover}
            handleDayClick={props.handleDayClick}
          />
        )}
      </div>
    </div>
  );
};

export default DatesSchedule;
