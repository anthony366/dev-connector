import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //if there's a token, add token to Authorization header
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //if not, delete authorization header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
