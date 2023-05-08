import IconCard from '../UI/IconCard';

interface IProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const BarIcon = ({ children, onClick }: IProps) => {
  return (
    <button onClick={onClick}>
      <IconCard className='rounded !bg-white/20 p-3 text-white transition hover:!bg-white/40'>
        {children}
      </IconCard>
    </button>
  );
};

export default BarIcon;
