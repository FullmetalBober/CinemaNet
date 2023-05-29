import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Schedule from './components/Schedule/Schedule';
import Movie from './components/Movie/Movie';
import { Analytics } from '@vercel/analytics/react';
import Showtime from './components/Showtime/Showtime';
import Authorization from './components/Authorization/Authorization';
import Providers from './contexts/Providers';
import PrivateWrapper from './components/utils/PrivateWrapper';
import './App.css';
import Cabinet from './components/Cabinet/Cabinet';
import { ConfigProvider, theme } from 'antd';

function App() {
  return (
    <>
      <Providers>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: 'rgb(239 68 68)',
            },
          }}
        >
          <Navbar />
          <Routes>
            <Route path='/' element={<Schedule />} />
            <Route path='movie/:movieSlug' element={<Movie />} />
            <Route path='showtime/:showtimeId' element={<Showtime />} />
            <Route path='auth' element={<Authorization />} />
            <Route element={<PrivateWrapper />}>
              <Route path='me' element={<Cabinet />} />
            </Route>
            <Route path='*' element={<h1>404</h1>} />
          </Routes>
        </ConfigProvider>
      </Providers>
      <Analytics />
    </>
  );
}

export default App;
