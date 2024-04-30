import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './ui/pages/MainPage'; 
import Autorization from './ui/pages/Autorization';
import Rental from './ui/pages/Rental';
import Map from './ui/pages/Map';
import Profile from './ui/pages/Profile';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/authorization" element={<Autorization />} />
        <Route path="/rental" element={<Rental/>} />
        <Route path='/map' element={<Map/>}/>
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);