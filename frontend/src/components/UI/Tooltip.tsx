import { useMemo } from 'react';

interface IProps {
  children: React.ReactNode;
  side: 'left-full' | 'right-full' | 'top-full' | 'bottom-full';
  className?: string;
}

const Tooltip = (props: IProps) => {
  return (
    <div
      className={`absolute z-10 mt-1 hidden whitespace-nowrap rounded bg-black px-3 py-1 text-center text-sm group-hover:block hover:!hidden ${props.side} ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Tooltip;
