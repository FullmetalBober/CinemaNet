import { useEffect, useState } from 'react';
import { IUser } from '../../../Interfaces';
import UserTable from './UserTable';
import { useHttpClient } from '../../../hooks/http-hook';

const CabinetUser = () => {
  const { sendRequest } = useHttpClient();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    (async () => {
      const response = await sendRequest({
        url: '/api/v1/users',
        params: {
          sort: 'role',
        },
        showErrMsg: true,
      });
      if (!response) return;
      setUsers(response.data.data.data);
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
