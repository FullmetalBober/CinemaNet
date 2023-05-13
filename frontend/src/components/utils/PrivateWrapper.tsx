import { Navigate, Outlet } from 'react-router-dom';
import { UserState } from '../../contexts/UserProvider';
import Loading from '../UI/Loading';

const PrivateRoute = () => {
  const { user, userLoading } = UserState();

  if (userLoading) return <Loading />;
  return user._id ? <Outlet /> : <Navigate to='/auth' />;
};

export default PrivateRoute;
