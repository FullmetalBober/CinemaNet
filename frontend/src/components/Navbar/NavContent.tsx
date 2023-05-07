import ChooseCinema from '../Cinema/ChooseCinema';

const NavContent = () => {
  return (
    <div className='block w-auto'>
      <ul className='mt-0 flex space-x-8 p-0 font-semibold'>
        <li>
          <ChooseCinema />
        </li>
        <li></li>
      </ul>
    </div>
  );
};

export default NavContent;
