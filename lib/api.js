import axios from "axios";

// =============================
// 1️⃣ CONFIGURE AXIOS INSTANCE
// =============================
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050",
  timeout: 10000,
  withCredentials: true, // allow sending/receiving cookies (refresh_token)
});

// =============================
// 2️⃣ IN-MEMORY ACCESS TOKEN
// =============================
let accessToken = null;

// helper functions
export const setAccessToken = (token) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

// =============================
// 3️⃣ REQUEST INTERCEPTOR
// =============================
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =============================
// 4️⃣ RESPONSE INTERCEPTOR (AUTO REFRESH)
// =============================
let isRefreshing = false;
let refreshSubscribers = [];

function onAccessTokenFetched(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb) {
  refreshSubscribers.push(cb);
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Wait for the refresh request to complete
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        // =============================
        // 5️⃣ REFRESH TOKEN REQUEST
        // =============================
        const refreshUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050"}/api/auth/refresh`;

        const { data } = await axios.post(
          refreshUrl,
          {},
          { withCredentials: true } // send refresh_token cookie
        );

        const newAccessToken = data.data.token;
        setAccessToken(newAccessToken);
        isRefreshing = false;
        onAccessTokenFetched(newAccessToken);

        // Retry original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        clearAccessToken();

        // Optional: redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/auth?view=login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// =============================
// 6️⃣ EXPORT CONFIGURED AXIOS
// =============================
export default api;
