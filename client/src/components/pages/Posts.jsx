import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddPost from "../forms/AddPost";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <AddPost />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);