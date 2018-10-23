import React, { Component } from "react";
import { Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import Dashboard from "./components/pages/Dashboard";
import Footer from "./components/Footer";
import "./App.css";
import store from "./store";

//check for auth token
if (localStorage.jwtToken) {
  //set auth header
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info
  const decodeToken = jwt_decode(localStorage.jwtToken);
  //set user authentication
  store.dispatch(setCurrentUser(decodeToken));
}

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
        <div className="container">
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
