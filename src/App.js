import React from 'react';
import './App.css';
import Home from './Home'
import Header from './Header'
import Footer from './Footer'
import SearchPage from './SearchPage'
import Login from './Login'
import Register from './Register'
import Orders from './Orders'
import Visited from './Visited'
import Profile from './Profile'
import UserPanel from './panels/UserPanel'
import RestaurantPanel from './panels/RestaurantPanel'
import AdminPanel from './panels/AdminPanel'
import SuperAdminPanel from './panels/SuperAdminPanel'
import bootstrapRepoToLocalStorage from './data/bootstrapRepoToLocalStorage'
import MockLogin from './mocks/MockLogin'
import MockRegister from './mocks/MockRegister'
import MockReservationsPrevious from './mocks/MockReservationsPrevious'
import MockReservationsCurrent from './mocks/MockReservationsCurrent'
import RestaurantPage from './RestaurantPage'
import RestaurantDemo from './RestaurantDemo'
import CategoryPage from './CategoryPage'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (

    // BEM
    <div className="app">
      <Router>
        {typeof window !== 'undefined' && bootstrapRepoToLocalStorage()}
        <Header />
        
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/visited">
            <Visited />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/mock/login">
            <MockLogin />
          </Route>
          <Route path="/mock/register">
            <MockRegister />
          </Route>
          <Route path="/reservas-anteriores">
            <MockReservationsPrevious />
          </Route>
          <Route path="/reservas-actuales">
            <MockReservationsCurrent />
          </Route>
          <Route path="/restaurant/:id">
            <RestaurantPage />
          </Route>
          <Route path="/restaurant/demo">
            <RestaurantDemo />
          </Route>
          <Route path="/category/:key">
            <CategoryPage />
          </Route>
          <Route path="/panel/user">
            <UserPanel />
          </Route>
          <Route path="/panel/restaurant/:id">
            <RestaurantPanel />
          </Route>
          <Route path="/panel/superadmin">
            <SuperAdminPanel />
          </Route>
          <Route path="/panel/admin">
            <AdminPanel />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        
        <Footer />
      </ Router>
    </div>
  );
}

export default App;
