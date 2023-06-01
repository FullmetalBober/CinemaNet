import { useEffect, useState } from 'react';
import axios from 'axios';
import { IMovie } from '../../../Interfaces';
import AvgStatsCostTable from './AvgStatsCostTable';
import HorizontalLine from '../../UI/HorizontalLine';
import AvgStatsSeatsTable from './AvgStatsSeatsTable';
import AvgStatsBarTable from './AvgStatsBarTable';
import { TableHeader } from '../../UI/Table/Table';
import MovieStatsTable from './MovieStatsTable';

export interface IAvgStats {
  _id: string;
  cost: number;
  seats: number;
  barOrders: number;
  costThisYear: number;
  seatsThisYear: number;
  barOrdersThisYear: number;
  costThisMonth: number;
  seatsThisMonth: number;
  barOrdersThisMonth: number;
  costThisWeek: number;
  seatsThisWeek: number;
  barOrdersThisWeek: number;
  costThisDay: number;
  seatsThisDay: number;
  barOrdersThisDay: number;
}

type popularMovie = IMovie & { count: number };

export interface IMovieStats {
  _id: string;
  mostPopular: popularMovie;
  leastPopular: popularMovie;
}

const CabinetStats = () => {
  const [avgStats, setAvgStats] = useState<IAvgStats[]>([]);
  const [movieStats, setMovieStats] = useState<IMovieStats[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [avgStats, movieStats] = await axios.all([
          axios.get('/api/v1/tickets/statsAvg'),
          axios.get('/api/v1/tickets/statsMovie'),
        ]);
        setAvgStats(avgStats.data.data.data);
        setMovieStats(movieStats.data.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const horizontalLineText = (text: string) => {
    return <h1 className='mb-2 text-3xl font-medium'>{text}</h1>;
  };

  const headersAvg: TableHeader[] = [
    { name: 'CINEMA' },
    { name: 'ALL TIME', type: 'number' },
    { name: 'YEAR', type: 'number' },
    { name: 'MONTH', type: 'number' },
    { name: 'WEEK', type: 'number' },
    { name: 'TODAY', type: 'number' },
  ];

  return (
    <div className='w-full'>
      <h1 className='mb-2 text-3xl font-medium'>STATS ON CINEMAS</h1>
      <HorizontalLine>{horizontalLineText('AVG STATS COST')}</HorizontalLine>
      <AvgStatsCostTable avgStats={avgStats} headers={headersAvg} />
      <HorizontalLine className='my-4'>
        {horizontalLineText('AVG STATS SEATS')}
      </HorizontalLine>
      <AvgStatsSeatsTable avgStats={avgStats} headers={headersAvg} />
      <HorizontalLine className='my-4'>
        {horizontalLineText('AVG STATS BAR')}
      </HorizontalLine>
      <AvgStatsBarTable avgStats={avgStats} headers={headersAvg} />
      <HorizontalLine className='my-4'>
        {horizontalLineText('MOVIE POPULAR STATS')}
      </HorizontalLine>
      <MovieStatsTable movieStats={movieStats} />
    </div>
  );
};

export default CabinetStats;
