import ProfileChangeInfo from "./ProfileChangeInfo";

const Profile = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className='text-3xl font-medium mb-2'>YOUR ACCOUNT SETTINGS</h1>
      <ProfileChangeInfo />
    </div>
  );
};

export default Profile;
