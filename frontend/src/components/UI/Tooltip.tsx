import { useMemo } from 'react';

interface IProps {
  children: React.ReactNode;
  side: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}

const Tooltip = (props: IProps) => {
  const side = useMemo<string>(() => `${props.side}-full`, [props.side]);

  return (
    <div
      className={`absolute z-10 mt-1 hidden whitespace-nowrap rounded bg-black px-3 py-1 text-center text-sm group-hover:block hover:!hidden ${side} ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Tooltip;
