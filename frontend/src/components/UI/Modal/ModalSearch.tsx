import Input from '../Form/Input';
import Modal from './Modal';

interface IProps {
  children: React.ReactNode;
  header: string;
  icon?: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onInput: (id: string, val: string) => void;
}

const ModalSearch = (props: IProps) => {
  return (
    <Modal
      show={props.show}
      onCancel={() => props.setShow(false)}
      position='left'
      closeColor='white'
    >
      <div className='h-[calc(100vh-102px)] px-3 py-2'>
        <h1 className='flex items-center gap-1 text-3xl font-semibold'>
          {props.icon} {props.header}
        </h1>
        <div className='h-full w-full text-xl'>
          <div className='p-2'>
            <Input
              id='search'
              element='input'
              type='text'
              label='Search'
              autoComplete='off'
              initialValid={true}
              onInput={props.onInput}
            />
          </div>
          {props.children}
        </div>
      </div>
    </Modal>
  );
};

export default ModalSearch;
