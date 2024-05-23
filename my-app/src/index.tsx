import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './ui/pages/MainPage'; 
import Autorization from './ui/pages/Autorization';
import Profile from './ui/pages/Profile';
import Payment from './ui/pages/Payments/Payment';
import Subscription from './ui/pages/Subscriptions';
import Reservation from './ui/pages/Payments/Reservation'
import Products from './ui/pages/Products';
import ProductOverview from './ui/pages/ProductOverview';
import Activities from './ui/pages/Activities'
import ActivityOverview from './ui/pages/ActivityOverview';
import Dashboard from './ui/pages/Dashboard';
import AdminRoute from './ui/pages/AdminRoute';
import MapPage from './ui/pages/MapPage'
import Transport from './ui/pages/Transport';
import SuccessPayment from './ui/pages/Payments/SuccessPayment'
import FailedPayment from './ui/pages/Payments/FailedPayment'
import SightDetailPage from './ui/pages/Sight';
import SightsPage from './ui/pages/SightsPage';
import TicketForm from './ui/pages/TicketForm';
import Restaurants from './ui/pages/Restaurants'

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
        <Route path="/map" element={<MapPage/>} />
        <Route path="/transport" element={<Transport/>}/>
        <Route path="/success" element={<SuccessPayment/>}/>
        <Route path="/failed" element={<FailedPayment/>}/>
        <Route path="/sight" element={<SightsPage></SightsPage>} />
        <Route path="/tickets" element={<TicketForm></TicketForm>}/>
        <Route path="/restaurants" element={<Restaurants/>}/>
        <Route path="/sight/:id" element={<SightDetailPage name={''} description={''} image={''}/>} />
        <Route path="/admin" element={
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
        } />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);