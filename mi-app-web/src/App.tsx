import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TemplatesPage from './pages/TemplatesPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemplatesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
