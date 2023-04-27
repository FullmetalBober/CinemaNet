import ScrollbarDiv from '../UI/ScrollbarDiv';
import TextClick from '../UI/TextClick';
import ModalNav from './ModalNav';

interface IProps {
  cities: string[];
  city: string;
  onClick: (city: string) => void;
}

const CitiesModal = (props: IProps) => {
  return (
    <ScrollbarDiv className="w-1/3 bg-[#221f1f] overflow-y-auto">
      <ModalNav className="mb-3 font-extrabold">City</ModalNav>

      {props.cities.map((value, index) => (
        <TextClick
          key={index}
          className={`hover:text-[#ff0a14] mt-2 text-2xl ${
            value === props.city && 'text-[#ff0a14]'
          }`}
          onClick={() => props.onClick(value)}
        >
          {value}
        </TextClick>
      ))}
    </ScrollbarDiv>
  );
};

export default CitiesModal;
