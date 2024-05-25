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
import SuccessPayment from './ui/pages/Payments/SuccessPayment';
import RentalSuccess from './ui/pages/Payments/SuccessRental'
import FailedPayment from './ui/pages/Payments/FailedPayment'
import SightOverview from './ui/pages/Sight';
import SightsPage from './ui/pages/SightsPage';
import TicketForm from './ui/pages/TicketForm';
import Restaurants from './ui/pages/Restaurants'
import RestaurantsOverview from './ui/pages/RestaurantsOverview'
import ChatWithAgents from './ui/pages/ChatWithAgents'

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
        <Route path="/success_reservation" element={<RentalSuccess/>}/>
        <Route path="/failed" element={<FailedPayment/>}/>
        <Route path="/sight" element={<SightsPage></SightsPage>} />
        <Route path="/tickets" element={<TicketForm></TicketForm>}/>
        <Route path="/restaurants" element={<Restaurants/>}/>
        <Route path="/restaurant/:id" element={<RestaurantsOverview/>}/>
        <Route path="/sight/:id" element={<SightOverview/>} />
        <Route path="/chat" element={<ChatWithAgents/>} />
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