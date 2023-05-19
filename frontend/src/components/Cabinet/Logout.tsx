import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserState } from '../../contexts/UserProvider';
import { IUser } from '../../Interfaces';
import { BsArrowRightShort } from 'react-icons/bs';

interface IProps {
  className?: string;
}

const Logout = (props: IProps) => {
  const navigate = useNavigate();
  const { setUser } = UserState();

  const logout = () => {
    (async () => {
      try {
        const response = await axios.get('/api/v1/users/logout');

        if (response.data.status === 'success') {
          setUser({} as IUser);
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <button className={`group flex ${props.className}`} onClick={logout}>
      Logout{' '}
      <BsArrowRightShort className=' ml-2 rounded-full bg-white/20 text-3xl transition group-hover:bg-red-500' />
    </button>
  );
};

export default Logout;
