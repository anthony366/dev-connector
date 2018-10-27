import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearProfile } from "./actions/profileActions";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import Dashboard from "./components/pages/Dashboard";
import CreateProfile from "./components/pages/CreateProfile";
import EditProfile from "./components/pages/EditProfile";
import Footer from "./components/Footer";
import "./App.css";
import AddExperience from "./components/forms/AddExperience";
import AddEducation from "./components/forms/AddEducation";
import Profiles from "./components/profiles/Profiles";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile
    store.dispatch(clearProfile());
    // Redirect to login
    window.location.href = "/login";
  }
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
          <Route exact path="/profiles" component={Profiles} />

          {/* use Switch for private routes */}
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/create-profile" component={CreateProfile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <PrivateRoute path="/add-experience" component={AddExperience} />
            <PrivateRoute path="/add-education" component={AddEducation} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
