import { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from '../Interfaces';
import { useHttpClient } from '../hooks/http-hook';

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
  const { sendRequest } = useHttpClient();
  const [userLoading, setUserLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setUserLoading(true);
      const response = await sendRequest({
        url: '/api/v1/users/me',
        showErrMsg: true,
      });
      if (response?.data.status === 'success') setUser(response.data.data.data);

      if (response) setUserLoading(false);
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
