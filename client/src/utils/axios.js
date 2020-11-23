import Axios from "axios";
import store from "../store";

const axios = Axios.create({
  baseURL: "http://localhost:8800",
  withCredentials: true,
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error.response);
    if (error.response.status === 401) {
      store.dispatch({ type: "SIGN_OUT_SUCCESS" });
      return (window.location.href = "/sign-in");
    }
  }
);

// axios.interceptors.response.use(
//   res => {
//     if (res.data.type === 'auth') {
//     }
//     return res
//   },
//   err => {
//     if (err.message === 'Network Error') {
//       console.log('-----------')
//       return 'Error'
//     }
//   }
// )

export default axios;
