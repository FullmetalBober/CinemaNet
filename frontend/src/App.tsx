import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Schedule from './components/Schedule/Schedule';
import Movie from './components/Movie/Movie';
import { Analytics } from '@vercel/analytics/react';
import Showtime from './components/Showtime/Showtime';
import Auth from './components/User/Auth';
import Providers from './contexts/Providers';
import PrivateWrapper from './components/utils/PrivateWrapper';
import './App.css';

function App() {
  return (
    <>
      <Providers>
        <Navbar />
        <Routes>
          <Route path='/' element={<Schedule />} />
          <Route path='movie/:movieSlug' element={<Movie />} />
          <Route path='showtime/:showtimeId' element={<Showtime />} />
          <Route path='auth' element={<Auth />} />
          <Route element={<PrivateWrapper />}>
            <Route path='me' element={<h1>Me</h1>} />
          </Route>
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </Providers>
      <Analytics />
    </>
  );
}

export default App;
