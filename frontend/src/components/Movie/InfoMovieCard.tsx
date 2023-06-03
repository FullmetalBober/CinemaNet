interface IProps {
  children: React.ReactNode;
  title: string;
  classNameSecond?: string;
}

const InfoMovieCard = (props: IProps) => {
  return (
    <li className='mb-1 grid grid-cols-5'>
      <p className='font-extrabold'>{props.title}:</p>
      <p
        className={`col-span-4 font-medium text-white/50 ${props.classNameSecond}`}
      >
        {props.children}
      </p>
    </li>
  );
};

export default InfoMovieCard;
