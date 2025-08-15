import axios from "axios";

const WL = "/api/watchlist";

export const getMyWatchlist      = () => axios.get(WL, { withCredentials: true });
export const addToWatchlist      = (id) => axios.post(`${WL}/${id}`, null, { withCredentials: true });
export const removeFromWatchlist = (id) => axios.delete(`${WL}/${id}`, { withCredentials: true });
