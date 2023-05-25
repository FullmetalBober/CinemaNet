import Button from '../Button';
import Modal from './Modal';

interface IProps {
  children: React.ReactNode;
  header: string;
  icon?: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  actions: (val: any) => void;
}

const ModalSearch = (props: IProps) => {
  return (
    <Modal
      show={props.show}
      onCancel={() => props.setShow(false)}
      position='left'
      closeColor='white'
    >
      <div className='px-3 py-2'>
        <h1 className='flex items-center gap-1 text-2xl font-semibold'>
          {props.icon} {props.header}
        </h1>
        <div className='p-2 text-xl'>{props.children}</div>

        <div className='flex justify-end gap-5'>
          {/* <Button
            onClick={() => {
              props.setShow(false);
              props.actions();
            }}
          >
            Yes, delete me
          </Button> */}
          <Button outline={true} onClick={() => props.setShow(false)}>
            Ehh, NO
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSearch;
