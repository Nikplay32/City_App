import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './ui/pages/MainPage'; 
import Autorization from './ui/pages/Autorization';
import Profile from './ui/pages/Profile';
import Payment from './ui/pages/Payment';
import Subscription from './ui/pages/Subscriptions';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/authorization" element={<Autorization />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path='/subs' element={<Subscription />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);