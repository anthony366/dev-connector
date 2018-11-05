import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    //if logged in, user won't be able to change url in browser
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // error checking, if no errors redirect to dashbord page
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-5 m-auto login">
              <h1 className="display-4 text-center">Log in</h1>
              <form onSubmit={this.handleSubmit} noValidate>
                <label htmlFor="email">Email Address</label>
                <TextFieldGroup
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  error={errors.email}
                />
                <label htmlFor="email">Password</label>
                <TextFieldGroup
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  error={errors.password}
                />
                <input
                  type="submit"
                  value="Login"
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
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
