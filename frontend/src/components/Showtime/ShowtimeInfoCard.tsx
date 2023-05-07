import TextOpacity from '../UI/TextOpacity';

interface IProps {
  header: string;
  text: string;
  icon: React.ReactNode;
}

const ShowtimeInfoCard = (props: IProps) => {
  return (
    <div className='flex items-center rounded border border-white/50'>
      <div className='flex items-center bg-white/50 p-2 text-4xl text-black'>
        {props.icon}
      </div>
      <div className='ml-3 pr-4 text-center'>
        <TextOpacity className='text-sm font-medium'>
          {props.header}
        </TextOpacity>
        <p className='mt-1'>{props.text}</p>
      </div>
    </div>
  );
};

export default ShowtimeInfoCard;
