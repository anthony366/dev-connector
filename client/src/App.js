import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Footer from "./components/Footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>
    );
  }
}

export default App;
