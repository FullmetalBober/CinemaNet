interface IProps {
  children: React.ReactNode;
  title: string;
  classNameSecond?: string;
}

const InfoMovieCard = (props: IProps) => {
  return (
    <li className='mb-1 flex'>
      <p className='w-44 font-extrabold'>{props.title}:</p>
      <p className={`font-medium text-white/50 ${props.classNameSecond}`}>
        {props.children}
      </p>
    </li>
  );
};

export default InfoMovieCard;
