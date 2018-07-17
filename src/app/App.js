import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import fbConnection from '../firebaseRequests/connection';
import BuyerProfile from '../components/BuyerProfile/BuyerProfile';
import Login from '../components/Login/Login';
import MyOrder from '../components/MyOrder/MyOrder';
import Navbar from '../components/Navbar/Navbar';
import OrderDetail from '../components/OrderDetail/OrderDetail';
import OrderForm from '../components/OrderForm/OrderForm';
import Register from '../components/Register/Register';
import SupplierProfile from '../components/SupplierProfile/SupplierProfile';

fbConnection();
class App extends Component {
  render () {
    if (firebase.apps.length) {
      console.error('Firebase Initialized!');
    };
    return (
      <div className="App">
        <BuyerProfile />
        <Login />
        <MyOrder />
        <Navbar />
        <OrderDetail />
        <OrderForm />
        <Register />
        <SupplierProfile />
      </div>
    );
  }
}

export default App;
