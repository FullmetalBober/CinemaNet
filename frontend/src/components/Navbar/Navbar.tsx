import { NavLink } from 'react-router-dom';
import NavContent from './NavContent';

const Navbar = () => {
  return (
    <nav className="bg-[#221f1f] border-b border-white/10">
      <div className="flex justify-between items-center p-4 px-7">
        <NavLink to="/" className="text-red-500 font-bold text-xl">
          CinemaNet
        </NavLink>
          {/* <NavButton /> */}
          <NavContent />
      </div>
    </nav>
  );
};

export default Navbar;
