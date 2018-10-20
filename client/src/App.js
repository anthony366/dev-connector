import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import Footer from "./components/Footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
        <div className="container">
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
