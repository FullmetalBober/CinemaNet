import { NavLink } from 'react-router-dom';
import NavContent from './NavContent';

const Navbar = () => {
  return (
    <nav className="sticky left-0 right-0 top-0 z-10 w-full border-b border-white/10 bg-[#221f1f]">
      <div className="flex items-center justify-between px-7">
        <NavLink to="/" className="">
          <img width={104} src="/logo.png" alt="CinemaNet" />
        </NavLink>
        {/* <NavButton /> */}
        <NavContent />
      </div>
    </nav>
  );
};

export default Navbar;
