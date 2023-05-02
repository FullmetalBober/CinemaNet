import ScrollbarDiv from '../UI/ScrollbarDiv';
import TextClick from '../UI/TextClick';
import HeaderText from './HeaderText';

interface IProps {
  cities: string[];
  city: string;
  onClick: (city: string) => void;
}

const CitiesModal = (props: IProps) => {
  return (
    <ScrollbarDiv className="w-1/3 overflow-y-auto bg-[#221f1f]">
      <HeaderText className="mb-3 font-extrabold">City</HeaderText>

      {props.cities.map((value, index) => (
        <TextClick
          key={index}
          className={`mt-2 text-2xl hover:text-[#ff0a14] ${
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
