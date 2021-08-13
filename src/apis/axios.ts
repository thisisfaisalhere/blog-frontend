import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

let user = null;

// store.subscribe(async () => {
//   user = await store.getState().user.currentUser;
//   if (user)
//     instance.defaults.headers.common[
//       "Authorization"
//     ] = `JWT ${user.tokens.access}`;
// });

const instance = axios.create({
  baseURL: url,
  timeout: 5000,
});

instance.interceptors.response.use(
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
          return instance
            .post("/user/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              // user.tokens.access = response.data.access;
              // console.log("token refreshed");
              // axios.defaults.headers[
              //   "Authorization"
              // ] = `JWT ${response.data.access}`;
              // originalRequest.headers[
              //   "Authorization"
              // ] = `JWT ${response.data.access}`;
              // store.dispatch(setCurrentUser(user));

              // todo: set user tokens
              return axios(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          alert("Token has Expired you need to login again");

          // todo: navigate to login page
        }
      } else {
        console.log("Refresh token not available.");

        // todo: navigate to login page
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
