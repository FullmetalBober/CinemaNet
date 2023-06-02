import { useNavigate } from 'react-router-dom';
import { UserState } from '../../contexts/UserProvider';
import { IUser } from '../../Interfaces';
import { BsArrowRightShort } from 'react-icons/bs';
import { useHttpClient } from '../../hooks/http-hook';

interface IProps {
  className?: string;
}

const Logout = (props: IProps) => {
  const navigate = useNavigate();
  const { setUser } = UserState();
  const { sendRequest } = useHttpClient();

  const logout = () => {
    (async () => {
      const response = await sendRequest({
        url: '/api/v1/users/logout',
        showErrMsg: true,
        showSuccessMsg: 'Logout successfully',
      });
      if (response?.data.status === 'success') {
        setUser({} as IUser);
        navigate('/', { replace: true });
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
