import { createContext, useContext, useState } from 'react';
import { IUser } from '../Interfaces';

interface UserContextType {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

interface IProps {
  children: React.ReactNode;
}

// const UserDefault = {
//   _id: '',
//   name: '',
//   email: '',
//   role: '',
// } as IUser;

const UserContext = createContext<UserContextType>({} as UserContextType);

const UserProvider = (props: IProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
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
