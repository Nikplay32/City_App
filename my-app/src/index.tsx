import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './ui/pages/HomePage/MainPage'; 
import Autorization from './ui/pages/AuthorizationPage/Autorization';
import Profile from './ui/pages/ProfilePage/Profile';
import Payment from './ui/pages/Payments/Payment';
import Subscription from './ui/pages/SubscriptionPage/Subscriptions';
import Reservation from './ui/pages/Payments/Reservation'
import Products from './ui/pages/ProductsPages/Products';
import ProductOverview from './ui/pages/ProductsPages/ProductOverview';
import Activities from './ui/pages/Activities/Activities'
import ActivityOverview from './ui/pages/Activities/ActivityOverview';
import Dashboard from './ui/pages/Dashboard/Dashboard';
import AdminRoute from './ui/pages/AdminRoute';
import MapPage from './ui/pages/MapPage/MapPage'
import Transport from './ui/pages/Tickets/Transport';
import SuccessPayment from './ui/pages/Payments/SuccessPayment';
import RentalSuccess from './ui/pages/Payments/SuccessRental'
import FailedPayment from './ui/pages/Payments/FailedPayment'
import SightOverview from './ui/pages/SightsPages/Sight';
import SightsPage from './ui/pages/SightsPages/SightsPage';
import TicketForm from './ui/pages/Tickets/TicketForm';
import Restaurants from './ui/pages/RestaurantsPages/Restaurants';
import RestaurantsOverview from './ui/pages/RestaurantsPages/RestaurantsOverview';
import ChatWithAgents from './ui/pages/ChatWithAgents/ChatWithAgents';
import HairdressingSalons from './ui/pages/HairdressingSalonsPage/HairddressingSalons';
import HairdressingSalonsOverview from './ui/pages/HairdressingSalonsPage/HairdressingSalonsOverview'

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
        <Route path="/salons" element={<HairdressingSalons/>}/>
        <Route path="/salons/:id" element={<HairdressingSalonsOverview/>}/>
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