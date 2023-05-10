import { createPortal } from 'react-dom';
import { ISeat } from '../../Interfaces';
import NavMenuButton from '../UI/NavMenuButton';
import { BsChevronRight } from 'react-icons/bs';

interface IProps {
  selectedSeats: ISeat[];
  isSeatsPage: boolean;
  setIsSeatsPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBuyMenu = (props: IProps) => {
  return createPortal(
    <div className='ml-4 flex items-center gap-2'>
      <div>
        <NavMenuButton
          onClick={() => props.setIsSeatsPage(true)}
          className={props.isSeatsPage ? 'text-red-500' : ''}
        >
          Seats
        </NavMenuButton>
      </div>
      <BsChevronRight className='text-xs' />
      <div>
        <NavMenuButton
          onClick={() =>
            props.selectedSeats.length ? props.setIsSeatsPage(false) : null
          }
          className={`${
            props.selectedSeats.length === 0 ? 'cursor-not-allowed' : ''
          } ${!props.isSeatsPage ? 'text-red-500' : ''}`}
        >
          Goods
        </NavMenuButton>
      </div>
    </div>,
    document.getElementById('nav-hook')!
  );
};

export default NavBuyMenu;
