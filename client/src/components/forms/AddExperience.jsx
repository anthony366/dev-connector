import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  state = {
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleInputCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const expData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-7 ml-auto mr-auto mb-3 p-0">
              <Link to="/dashboard" className="btn btn-light">
                <span>
                  <i className="fas fa-long-arrow-alt-left" />
                </span>{" "}
                Back to Dashboard
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7 m-auto add-experience">
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">
                <span className="text-danger">*</span> required field
              </small>
              <form onSubmit={this.handleSubmit} noValidate>
                <label htmlFor="jobTitle">
                  <span className="text-danger">*</span>
                  Job Title
                </label>
                <TextFieldGroup
                  name="title"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  error={errors.title}
                />
                <label htmlFor="company">
                  <span className="text-danger">*</span>
                  Company
                </label>
                <TextFieldGroup
                  name="company"
                  value={this.state.company}
                  onChange={this.handleInputChange}
                  error={errors.company}
                />
                <label htmlFor="jobTitle">Location</label>
                <TextFieldGroup
                  name="location"
                  value={this.state.location}
                  onChange={this.handleInputChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.handleInputChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.handleInputChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.handleInputCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <label htmlFor="jobDescription">Job Description</label>
                <TextAreaFieldGroup
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  error={errors.description}
                  info="Describe some of your job duties"
                />
                <input
                  type="submit"
                  value="Add Experience"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
