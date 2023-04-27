import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';

const Loading = () => {
  return (
    <UseAnimations
      animation={loading}
      strokeColor="white"
      className="mx-auto"
    />
  );
};

export default Loading;
