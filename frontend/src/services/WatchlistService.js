import axios from "axios";

const WL = "http://3.146.37.153/api/watchlist";

const authHeader = () => {
  const token = localStorage.getItem("jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getMyWatchlist = () =>
  axios.get(WL, { headers: authHeader() });

export const addToWatchlist = (id) =>
  axios.post(`${WL}/${id}`, null, { headers: authHeader() });

export const removeFromWatchlist = (id) =>
  axios.delete(`${WL}/${id}`, { headers: authHeader() });
