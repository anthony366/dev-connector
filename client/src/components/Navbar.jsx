import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { clearProfile } from "../actions/profileActions";

class Navbar extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.clearProfile();
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    //displayed navbar items when authenticated
    const authLinks = (
      <ul className="navbar-nav auth-menu">
        <li className="nav-item">
          <Link to="/posts" className="nav-link">
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item profile">
          <span className="user-name">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.firstname}
              style={{ width: "25px", marginRight: "5px" }}
            />
            {user.firstname}
          </span>
          <ul className="profile-menu">
            <li className="profile-item">
              <a
                href="true"
                onClick={this.handleLogout}
                className="dropdown-link"
              >
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    );

    //displayed navbar items when not authenticated
    const guestLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link signup">
            Sign Up
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand" href="landing.html">
            HeyDev!
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobileNav"
            aria-controls="mobileNav"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobileNav">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Profiles
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearProfile }
)(withRouter(Navbar));
