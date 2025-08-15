// frontend/src/services/WatchlistService.js
import axios from "axios";

const BASE = process.env.REACT_APP_API_BASE || "http://3.146.37.153:8080";

// one axios instance so withCredentials is always set
const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
});

// If your backend really is `/api/watchlist`
export const getMyWatchlist       = () => api.get("/api/watchlist");
export const addToWatchlist       = (id) => api.post(`/api/watchlist/${id}`);
export const removeFromWatchlist  = (id) => api.delete(`/api/watchlist/${id}`);
