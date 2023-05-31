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
      case 'Showtime':
        return <CabinetShowtime />;
      case 'Movie':
        return <CabinetMovie />;
      case 'Bar':
        return <CabinetBar />;
      case 'Genre':
        return <CabinetGenre />;
      case 'Hall':
        return <CabinetHall />;
      case 'Cinema':
        return <CabinetCinema />;
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
