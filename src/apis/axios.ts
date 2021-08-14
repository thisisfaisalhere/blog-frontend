import axiosInstance from "axios";
import { IUser } from "../helpers/interfaces";
import { store } from "../redux/store";
import { setCurrentUser } from "../redux/user/user.actions";

const url = process.env.REACT_APP_BACKEND_URL;

let user: IUser | null = null;

store.subscribe(() => {
  user = store.getState().user.currentUser;
  if (user)
    axios.defaults.headers.common[
      "Authorization"
    ] = `JWT ${user.tokens.access}`;
});

export const axios = axiosInstance.create({
  baseURL: url,
  timeout: 5000,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (typeof error.response === "undefined") {
      alert(
        `A server/network error occurred.\n
        Looks like CORS might be the problem.\n
        Sorry about this - we will get it fixed shortly.`
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = user && user?.tokens.refresh;
      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axios
            .post("api/user/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              if (user) {
                user.tokens.access = response.data.access;
                console.log("token refreshed");
                axiosInstance.defaults.headers[
                  "Authorization"
                ] = `JWT ${response.data.access}`;
                originalRequest.headers[
                  "Authorization"
                ] = `JWT ${response.data.access}`;
                store.dispatch(setCurrentUser(user));
              }
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          alert("Token has Expired you need to login again");
          window.location.href = "/login";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
