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

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (

    // BEM
    <div className="app">
      <Router>
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
          <Route path="/panel/user">
            <UserPanel />
          </Route>
          <Route path="/panel/restaurant/:id">
            <RestaurantPanel />
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
