/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios from "axios";

const api = axios.create({
   baseURL: "/",
});

// Add a request interceptor
api.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => Promise.reject(error)
);

api.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;

      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;

         try {
            const response = await axios.post(
               "/.netlify/functions/auth-refresh-token"
            );
            const { accessToken } = response.data;
            localStorage.setItem("accessToken", accessToken);

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
         } catch (err) {
            // Handle refresh token error or redirect to login
            localStorage.clear();
            window.location.href = "/";
         }
      }

      return Promise.reject(error);
   }
);

export default api;
