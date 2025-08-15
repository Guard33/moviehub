import axios from "axios";

const api = axios.create({
  baseURL: "/api/watchlist", // Nginx proxies /api -> backend:8080/api
  withCredentials: true,
});

export const getMyWatchlist      = () => api.get("/");
export const addToWatchlist      = (id) => api.post(`/${id}`);
export const removeFromWatchlist = (id) => api.delete(`/${id}`);

