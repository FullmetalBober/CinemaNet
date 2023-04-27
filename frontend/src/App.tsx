import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import CinemaProvider from './contexts/CinemaProvider';
import Schedule from './components/Schedule/Schedule';

function App() {
  return (
    <>
      <CinemaProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="about" element={<h1>About</h1>} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </CinemaProvider>
    </>
  );
}

export default App;
