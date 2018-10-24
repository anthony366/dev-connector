import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register User
export const registerUser = (userData, history) => dispatch => {
  //send data to register api end point
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) //redirects user to login page after registering
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login User with token
export const loginUser = userData => dispatch => {
  //send data to login api end point
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token); // set token to Auth header
      const decodeToken = jwt_decode(token); // decode token to get user data
      dispatch(setCurrentUser(decodeToken));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Log in user with user data (name, email, etc)
export const setCurrentUser = decodeToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodeToken
  };
};

//Log out user
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  // history.push("/");
};
