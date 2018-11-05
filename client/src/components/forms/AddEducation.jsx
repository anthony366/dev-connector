import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
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
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    // Select options for degree or certs
    const options = [
      { label: "Select Degree or Certification", value: 0 },
      { label: "Associate Degree", value: "Associate Degree" },
      { label: "Bachelor's Degree", value: "Bachelor's Degree" },
      { label: "Master's Degree", value: "Master's Degree" },
      { label: "Certificate", value: "Certificate" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 ml-auto mr-auto mb-3">
              <Link to="/dashboard" className="btn btn-light">
                <span>
                  <i className="fas fa-long-arrow-alt-left" />
                </span>{" "}
                Back to Dashboard
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7 m-auto add-education">
              <h1 className="text-center">Add Education</h1>
              <p className="text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">
                <span className="text-danger">*</span> required fields
              </small>
              <form onSubmit={this.handleSubmit} noValidate>
                <label htmlFor="school">
                  <span className="text-danger">*</span> School
                </label>
                <TextFieldGroup
                  name="school"
                  value={this.state.school}
                  onChange={this.handleInputChange}
                  error={errors.school}
                />
                <label htmlFor="degree">
                  <span className="text-danger">*</span> Degree/Certificate
                </label>
                <SelectListGroup
                  name="degree"
                  value={this.state.degree}
                  onChange={this.handleInputChange}
                  options={options}
                  error={errors.degree}
                />
                <label htmlFor="fieldofstudy">
                  <span className="text-danger">*</span> Field of Study
                </label>
                <TextFieldGroup
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.handleInputChange}
                  error={errors.fieldofstudy}
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
                    Currently attending
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  error={errors.description}
                  info="Tell us about the program that you were in"
                />
                <input
                  type="submit"
                  value="Add Education"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
