import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount() {
    //if logged in, user won't be able to change url in browser
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    //get input validation errors from state
    const { errors } = this.state;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-5 m-auto register">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="text-center">Create your account</p>
              <p className="small">
                <span className="text-danger">*</span>
                All fields are required
              </p>
              <form onSubmit={this.handleSubmit} noValidate>
                <label htmlFor="firstname">First Name</label>
                <TextFieldGroup
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleInputChange}
                  error={errors.firstname}
                />
                <label htmlFor="lastname">Last Name</label>
                <TextFieldGroup
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleInputChange}
                  error={errors.lastname}
                />
                <label htmlFor="email">Email Address</label>
                <TextFieldGroup
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  error={errors.email}
                />
                <label htmlFor="password">Password</label>
                <TextFieldGroup
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  error={errors.password}
                />
                <label htmlFor="password2">Confirm Password</label>
                <TextFieldGroup
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.handleInputChange}
                  error={errors.password2}
                />
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
