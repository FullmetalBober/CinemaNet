import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="about" element={<h1>About</h1>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      ;
    </>
  );
}

export default App;
