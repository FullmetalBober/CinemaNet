import { IoIosArrowDown } from 'react-icons/io';

interface IProps {
  className?: string;
  active?: boolean;
}

const ArrowDown = ({ className, active }: IProps) => {
  return (
    <IoIosArrowDown
      className={`flex cursor-pointer items-center rounded-full p-1 text-3xl transition ${
        active === true
          ? '!bg-white/100 !text-red-500'
          : 'bg-white/20 hover:bg-red-500'
      } ${className}
      `}
    />
  );
};

export default ArrowDown;
