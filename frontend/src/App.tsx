import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import CinemaProvider from './contexts/CinemaProvider';
import Schedule from './components/Schedule/Schedule';
import Movie from './components/Movie/Movie';

function App() {
  return (
    <>
      <CinemaProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="movie/:movieSlug" element={<Movie />} />
          <Route path="showtime/:showtimeId" element={<>showtime</>} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </CinemaProvider>
    </>
  );
}

export default App;
