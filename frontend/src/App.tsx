import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import CinemaProvider from './contexts/CinemaProvider';
import Schedule from './components/Schedule/Schedule';
import Movie from './components/Movie/Movie';
import { Analytics } from '@vercel/analytics/react';
import Showtime from './components/Showtime/Showtime';

function App() {
  return (
    <>
      <CinemaProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Schedule />} />
          <Route path='movie/:movieSlug' element={<Movie />} />
          <Route path='showtime/:showtimeId' element={<Showtime />} />
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </CinemaProvider>
      <Analytics />
    </>
  );
}

export default App;
