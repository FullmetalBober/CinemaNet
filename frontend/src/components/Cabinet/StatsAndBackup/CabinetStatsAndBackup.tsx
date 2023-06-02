import { useEffect, useState } from 'react';
import { IMovie } from '../../../Interfaces';
import AvgStatsCostTable from './AvgStatsCostTable';
import HorizontalLine from '../../UI/HorizontalLine';
import AvgStatsSeatsTable from './AvgStatsSeatsTable';
import AvgStatsBarTable from './AvgStatsBarTable';
import { TableHeader } from '../../UI/Table/Table';
import MovieStatsTable from './MovieStatsTable';
import { useHttpClient } from '../../../hooks/http-hook';
import Button from '../../UI/Button';
import Loading from '../../UI/Loading';

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

const CabinetStatsAndBackup = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [avgStats, setAvgStats] = useState<IAvgStats[]>([]);
  const [movieStats, setMovieStats] = useState<IMovieStats[]>([]);

  useEffect(() => {
    (async () => {
      const [avgStats, movieStats] = await Promise.all([
        sendRequest({ url: '/api/v1/tickets/statsAvg', showErrMsg: true }),
        sendRequest({ url: '/api/v1/tickets/statsMovie', showErrMsg: true }),
      ]);
      if (!avgStats || !movieStats) return;

      setAvgStats(avgStats.data.data.data);
      setMovieStats(movieStats.data.data.data);
    })();
  }, []);

  const createBackup = () => {
    (async () => {
      const responds = await sendRequest({
        url: '/api/v1/backups',
        showErrMsg: true,
      });
      if (!responds) return;

      const data = JSON.stringify(responds.data);
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'backup.json';
      a.click();
      window.URL.revokeObjectURL(url);
    })();
  };

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
      <h1 className='mb-2 text-3xl font-medium'>STATS & BACKUP ON CINEMAS</h1>
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
      <HorizontalLine className='my-4'>
        {horizontalLineText('CREATE BACKUP')}
      </HorizontalLine>
      <Button disabled={isLoading} onClick={createBackup} className='my-6'>
        {isLoading ? <Loading size={28} /> : 'CREATE BACKUP'}
      </Button>
    </div>
  );
};

export default CabinetStatsAndBackup;
