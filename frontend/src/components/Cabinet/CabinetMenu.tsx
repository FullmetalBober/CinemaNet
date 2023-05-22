import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';
import { RiTicketLine } from 'react-icons/ri';
import { MdOutlineMovie } from 'react-icons/md';
import { FaNapster } from 'react-icons/fa';
import { IoFastFoodOutline } from 'react-icons/io5';
import { useMemo } from 'react';
import { UserState } from '../../contexts/UserProvider';

interface IProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const CabinetMenu = ({ active, setActive }: IProps) => {
  const { user } = UserState();
  const menuItems = useMemo(() => {
    const classNameIcon = 'text-xl';
    let menuItems = [
      { value: 'Tickets', icon: <RiTicketLine className={classNameIcon} /> },
      { value: 'Profile', icon: <AiOutlineUser className={classNameIcon} /> },
    ];
    if (user.role === 'admin')
      menuItems = [
        ...menuItems,
        {
          value: 'Showtime',
          icon: <HiOutlineClock className={classNameIcon} />,
        },
        { value: 'Movie', icon: <MdOutlineMovie className={classNameIcon} /> },
        { value: 'Bar', icon: <IoFastFoodOutline className={classNameIcon} /> },
        { value: 'Genre', icon: <FaNapster className={classNameIcon} /> },
        {
          value: 'Cinema',
          icon: <HiOutlineLocationMarker className={classNameIcon} />,
        },
      ];
    return menuItems;
  }, [user.role]);

  return (
    <ul className='flex flex-col gap-2.5'>
      {menuItems.map(item => (
        <li
          key={item.value}
          onClick={() => setActive(item.value)}
          className={`flex cursor-pointer items-center gap-1 rounded border-2 px-3 py-2 transition hover:border-white hover:text-white ${
            active === item.value
              ? '!border-red-500 text-white'
              : 'border-white/50 text-white/50'
          }`}
        >
          {item.icon} {item.value}
        </li>
      ))}
    </ul>
  );
};

export default CabinetMenu;
