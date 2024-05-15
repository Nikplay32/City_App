import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './ui/pages/MainPage'; 
import Autorization from './ui/pages/Autorization';
import Profile from './ui/pages/Profile';
import Payment from './ui/pages/Payment';
import Subscription from './ui/pages/Subscriptions';
import Reservation from './ui/pages/Reservation'
import Products from './ui/pages/Products';
import ProductOverview from './ui/pages/ProductOverview';
import Activities from './ui/pages/Activities'
import ActivityOverview from './ui/pages/ActivityOverview';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/authorization" element={<Autorization />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path='/subs' element={<Subscription />} />
        <Route path='/products' element={<Products/>} />
        <Route path="/product/:id" element={<ProductOverview/>} />
        <Route path="/activities" element={<Activities/>} />
        <Route path="/activity/:id" element={<ActivityOverview/>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);