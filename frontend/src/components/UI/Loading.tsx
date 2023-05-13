import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';

interface IProps {
  size?: number;
}

const Loading = ({ size }: IProps) => {
  return (
    <UseAnimations
      animation={loading}
      strokeColor='white'
      size={size}
      className='border-box mx-auto'
    />
  );
};

export default Loading;
