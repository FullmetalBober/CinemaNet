import { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from '../Interfaces';
import axios from 'axios';

interface UserContextType {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  userLoading: boolean;
}

interface IProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

const UserProvider = (props: IProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  useEffect(() => {
    setUserLoading(true);
    (async () => {
      const response = await axios.get('/api/v1/users/me');
      if (response.data.status === 'success') setUser(response.data.data.data);
      setUserLoading(false);
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userLoading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
