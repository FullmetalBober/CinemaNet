import { createPortal } from 'react-dom';
import Logout from './Logout';
import { useEffect, useState } from 'react';

const NavLogout = () => {
  const [element, setElement] = useState(
    document.getElementById('nav-user-hook')
  );

  useEffect(() => {
    const el = document.getElementById('nav-user-hook');
    if (el) {
      setElement(el);
    }
  }, []);

  if (!element) return null;
  return createPortal(<Logout />, element);
};

export default NavLogout;
