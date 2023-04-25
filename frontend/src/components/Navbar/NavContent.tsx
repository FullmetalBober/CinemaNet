import ChooseCinema from "./ChooseCinema";

const NavContent = () => {
  return (
    <div className="block w-auto">
      <ul className="flex font-semibold p-0 space-x-8 mt-0">
        <li>
          <ChooseCinema />
        </li>
        <li></li>
      </ul>
    </div>
  );
};

export default NavContent;
