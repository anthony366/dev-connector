import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    return <h1>Dashboard works!!</h1>;
  }
}

Dashboard.propTypes = {};

// const mapStateToProps = (state) => ({

// })

export default connect(
  null,
  { getProfile }
)(Dashboard);
