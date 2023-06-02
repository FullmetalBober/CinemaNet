import { useState } from 'react';
import Button from '../../UI/Button';
import ConfirmationModal from '../../UI/Modal/ConfirmationModal';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../../../contexts/UserProvider';
import { IUser } from '../../../Interfaces';
import { useHttpClient } from '../../../hooks/http-hook';

const DeleteMe = () => {
  const { sendRequest } = useHttpClient();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { setUser } = UserState();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await sendRequest({
      url: '/api/v1/users/deleteMe',
      method: 'DELETE',
      showSuccessMsg: 'Account deleted successfully, bye!',
      showErrMsg: true,
    });

    if (response?.data === '') {
      setUser({} as IUser);
      navigate('/');
    }
  };

  return (
    <>
      <ConfirmationModal
        show={showConfirmation}
        setShow={setShowConfirmation}
        style='danger'
        header='Delete your account'
        icon={<RiDeleteBinLine />}
        actions={handleDelete}
        actionButtonText='Yeap, delete me'
        cancelButtonText='Ehh, NO'
      >
        <p>
          Ok, we get you clicked to delete you
          <br />
          <br />
          We'r not being dramatic but{' '}
          <span className='font-black'>there's no going back from it</span>, so
          do you really want to delete your account?
        </p>
      </ConfirmationModal>
      <Button outline={true} onClick={() => setShowConfirmation(true)}>
        Delete my account
      </Button>
    </>
  );
};

export default DeleteMe;
