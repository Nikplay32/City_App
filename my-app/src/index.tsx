import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './ui/pages/MainPage'; 
import Autorization from './ui/pages/Autorization';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/authorization" element={<Autorization />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);