import axios from "axios";
import { GET_ERRORS } from "./types";

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
