import classnames from 'classnames';
import { IUser } from '../../../Interfaces';
import Table from '../../UI/Table/Table';
import { UserState } from '../../../contexts/UserProvider';
import axios from 'axios';
import { useState } from 'react';
import ConfirmationModal from '../../UI/Modal/ConfirmationModal';
import { AiOutlineUser } from 'react-icons/ai';

interface IProps {
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const UserTable = ({ users, setUsers }: IProps) => {
  const { user } = UserState();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser>({} as IUser);

  const trClassName = classnames({
    'cursor-pointer': user.role === 'admin',
  });

  const changeRole = async () => {
    if (user.role !== 'admin' || selectedUser._id === user._id) return;
    try {
      await axios.patch(`/api/v1/users/${selectedUser._id}`, {
        role: selectedUser.role,
      });
      setUsers(prevState => {
        return prevState.map(user => {
          if (user._id === selectedUser._id) user.role = selectedUser.role;
          return user;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ConfirmationModal
        show={showConfirmation}
        setShow={setShowConfirmation}
        style='danger'
        header={`Change role - ${selectedUser.email}`}
        icon={<AiOutlineUser />}
        actions={changeRole}
        actionButtonText='Yeap, change role'
        cancelButtonText='Ehh, nope'
      >
        <p>
          Are you sure you want to set role "{selectedUser.role}" for{' '}
          <span className='font-medium'>{selectedUser.email}</span>?
        </p>
      </ConfirmationModal>
      <Table
        headers={[
          { name: 'PHOTO', type: 'none' },
          { name: 'NAME' },
          { name: 'EMAIL' },
          { name: 'ROLE' },
        ]}
      >
        {users.map(user => {
          return (
            <tr
              key={user._id}
              onClick={() => {
                if (user.role === 'admin') return;
                setSelectedUser({
                  ...user,
                  role: user.role === 'user' ? 'moderator' : 'user',
                });
                setShowConfirmation(true);
              }}
              className={trClassName}
            >
              <td>
                <img
                  src={user.photo}
                  alt={user.name}
                  className='h-10 w-10 rounded-full'
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          );
        })}
      </Table>
    </>
  );
};

export default UserTable;
