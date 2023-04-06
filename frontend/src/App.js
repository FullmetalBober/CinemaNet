import React from 'react';
import {
  BrowserRouter as Router,
  Route,
//   Navigate,
  Routes,
} from 'react-router-dom';

import Main from './main/pages/Main';

const App = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path='.' element={<Navigate to="/"/>}> */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
