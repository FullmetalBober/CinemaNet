import { useState } from 'react';
import Button from '../../UI/Button';
import ConfirmationModal from '../../UI/Modal/ConfirmationModal';
import { RiDeleteBinLine } from 'react-icons/ri';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../../../contexts/UserProvider';
import { IUser } from '../../../Interfaces';

const DeleteMe = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { setUser } = UserState();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete('/api/v1/users/deleteMe');
      if (response.data === '') {
        setUser({} as IUser);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
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
