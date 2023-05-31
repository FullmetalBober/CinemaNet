import { useEffect, useState } from 'react';
import { IUser } from '../../../Interfaces';
import axios from 'axios';
import UserTable from './UserTable';

const CabinetUser = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/v1/users?sort=role');
        const data = response.data.data.data;
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>USERS</h1>
      <UserTable users={users} setUsers={setUsers} />
    </div>
  );
};

export default CabinetUser;
