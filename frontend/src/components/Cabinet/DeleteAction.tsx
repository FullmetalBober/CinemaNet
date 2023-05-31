import { useState } from 'react';
import Button from '../UI/Button';
import ConfirmationModal from '../UI/Modal/ConfirmationModal';
import { RiDeleteBinLine } from 'react-icons/ri';

interface IProps {
  handleDelete: () => void;
}

const DeleteAction = (props: IProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <ConfirmationModal
        show={showConfirmation}
        setShow={setShowConfirmation}
        style='danger'
        header='Delete'
        icon={<RiDeleteBinLine />}
        actions={props.handleDelete}
        actionButtonText='Yeap, delete'
        cancelButtonText='Ehh, NO'
      />
      <Button outline={true} onClick={() => setShowConfirmation(true)}>
        Delete
      </Button>
    </>
  );
};

export default DeleteAction;
