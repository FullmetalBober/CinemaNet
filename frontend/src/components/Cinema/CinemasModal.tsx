import { ICinema } from '../../Interfaces';
import { CinemaState } from '../../contexts/CinemaProvider';
import ScrollbarDiv from '../UI/ScrollbarDiv';
import TextClick from '../UI/TextClick';
import HeaderText from './HeaderText';

interface IProps {
  cityCinemas: ICinema[];
  handleCinemaClick: (cinema: ICinema) => void;
}

const CinemasModal = (props: IProps) => {
  const { cinema } = CinemaState();
  return (
    <ScrollbarDiv className="w-2/3 bg-[rgba(238,242,245,.46)] text-black">
      <HeaderText className="mb-3 font-extrabold border-black">
        Cinema
      </HeaderText>

      {props.cityCinemas.map(cityCinema => (
        <div
          key={cityCinema._id}
          className="pb-4 mt-2 border-b border-slate-500"
        >
          <TextClick
            className={`hover:text-[#ff0a14] ${
              cityCinema._id === cinema._id && 'text-[#ff0a14]'
            }`}
            onClick={() => props.handleCinemaClick(cityCinema)}
          >
            {cityCinema.name}
          </TextClick>
          <p className="font-extrabold text-sm text-slate-500 font-mono">
            {cityCinema.location.address}
          </p>
        </div>
      ))}
    </ScrollbarDiv>
  );
};

export default CinemasModal;
