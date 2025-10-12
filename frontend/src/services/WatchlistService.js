// src/services/WatchlistService.js
import axios from "axios";

const WL = "/api/watchlist";

function auth() {
  const token = localStorage.getItem("jwt");
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
}

export const getMyWatchlist = () =>
  axios.get(WL, auth());

export const addToWatchlist = (id) =>
  axios.post(`${WL}/${id}`, null, auth());

export const removeFromWatchlist = (id) =>
  axios.delete(`${WL}/${id}`, auth());
