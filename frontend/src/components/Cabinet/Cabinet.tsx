import Profile from './Profile';
import CabinetMenu from './CabinetMenu';
import { useState } from 'react';
import NavLogout from './NavLogout';

const Cabinet = () => {
  const [active, setActive] = useState('Tickets');

  const renderSwitch = (param: string) => {
    switch (param) {
      // case 'Tickets':
      //   return <CabinetTickets />;
      case 'Profile':
        return <Profile />;
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
