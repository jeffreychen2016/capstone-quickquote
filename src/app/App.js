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
import SupplierProfile from '../components/SupplierProfile/SupplierProfile';
import Home from '../components/Home/Home';
import Chart from '../components/Chart/Chart';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';

fbConnection();
const PrivateRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/myorder', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends Component {
  state = {
    authed: false,
  };

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true});
      } else {
        this.setState({authed: false});
      };
    });
  };

  componentWillUnmount () {
    this.removeListener();
  }

  logout = () => {
    this.setState({authed: false});
  };

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar
              authed={this.state.authed}
              logout={this.logout}
            />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path="/home" exact component={Home}/>
                  <PrivateRoute
                    path="/myorder"
                    authed={this.state.authed}
                    component={MyOrder}
                  />
                  <PrivateRoute
                    path="/supplierprofile"
                    authed={this.state.authed}
                    component={SupplierProfile}
                  />
                  <PrivateRoute
                    path="/orderform"
                    authed={this.state.authed}
                    component={OrderForm}
                  />
                  <PrivateRoute
                    path="/orderdetail/:id/:isEstimate"
                    authed={this.state.authed}
                    component={OrderDetail}
                  />
                  {/* <PrivateRoute
                    path="/orderdetail"
                    authed={this.state.authed}
                    component={OrderDetail}
                  /> */}
                  <PrivateRoute
                    path="/buyerprofile"
                    authed={this.state.authed}
                    component={BuyerProfile}
                  />
                  <PrivateRoute
                    path="/chart"
                    authed={this.state.authed}
                    component={Chart}
                  />
                  <PublicRoute
                    path="/login"
                    authed={this.state.authed}
                    component={Login}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
