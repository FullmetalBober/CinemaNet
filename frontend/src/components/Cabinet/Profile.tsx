import { UserState } from '../../contexts/UserProvider';
import DangerContent from '../UI/DangerContent';
import DeleteMe from './DeleteMe';
import ProfileChangeInfo from './ProfileChangeInfo';

const Profile = () => {
  const { user } = UserState();

  return (
    <div className='flex flex-col items-center'>
      <h1 className='mb-2 text-3xl font-medium'>YOUR ACCOUNT SETTINGS</h1>
      <ProfileChangeInfo />
      {user.role === 'user' && (
        <DangerContent className='px-5' classNameChild='flex gap-14'>
          <DeleteMe />
        </DangerContent>
      )}
    </div>
  );
};

export default Profile;
