import Profile from './Profile/Profile';
import CabinetMenu from './CabinetMenu';
import { useState } from 'react';
import NavLogout from './NavLogout';
import CabinetTickets from './Tickets/CabinetTickets';
import CabinetShowtime from './Showtime/CabinetShowtime';
import CabinetMovie from './Movie/CabinetMovie';
import CabinetBar from './Bar/CabinetBar';
import CabinetGenre from './Genre/CabinetGenre';
import CabinetHall from './Hall/CabinetHall';
import CabinetCinema from './Cinema/CabinetCinema';
import CabinetPassword from './Password/CabinetPassword';
import CabinetUser from './User/CabinetUser';
import CabinetStats from './Stats/CabinetStats';

const Cabinet = () => {
  const [active, setActive] = useState('Tickets');

  const renderSwitch = (param: string) => {
    switch (param) {
      case 'Tickets':
        return <CabinetTickets />;
      case 'Profile':
        return <Profile />;
      case 'Password':
        return <CabinetPassword />;
      case 'Showtimes':
        return <CabinetShowtime />;
      case 'Movies':
        return <CabinetMovie />;
      case 'Bars':
        return <CabinetBar />;
      case 'Genres':
        return <CabinetGenre />;
      case 'Halls':
        return <CabinetHall />;
      case 'Cinemas':
        return <CabinetCinema />;
      case 'Users':
        return <CabinetUser />;
      case 'Stats':
        return <CabinetStats />;
    }
  };

  return (
    <>
      <NavLogout />
      <main className='mx-auto mb-7 mt-7 flex gap-10 lg:max-w-screen-xl'>
        <CabinetMenu active={active} setActive={setActive} />
        {renderSwitch(active)}
      </main>
    </>
  );
};

export default Cabinet;
