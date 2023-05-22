import ButtonControlMenu from './ButtonControlMenu';

interface IProps {
  buttons: string[];
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

const ControlMenu = ({ mode, setMode, buttons }: IProps) => {
  return (
    <div className='my-4 flex justify-center divide-x-2 divide-white/30 child:px-4'>
      {buttons.map(button => (
        <ButtonControlMenu
          key={button}
          onClick={() => setMode(button)}
          className={mode === button ? 'text-red-500' : ''}
        >
          {button}
        </ButtonControlMenu>
      ))}
    </div>
  );
};

export default ControlMenu;
