import { useState } from 'react';
import Button from '../UI/Button';
import ConfirmationModal from '../UI/ConfirmationModal';
import { RiDeleteBinLine } from 'react-icons/ri';

const DeleteMe = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  // TODO: Add delete account functionality
  return (
    <>
      <ConfirmationModal
        show={showConfirmation}
        setShow={setShowConfirmation}
        style='danger'
        header='Delete your account'
        icon={<RiDeleteBinLine />}
        actions={() => console.log('delete')}
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
