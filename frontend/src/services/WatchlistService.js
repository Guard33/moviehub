import axios from "axios";
const WL = "http://3.146.37.153:8080/api/watchlist";

export const getMyWatchlist    = () => axios.get(WL);
export const addToWatchlist    = (id) => axios.post(`${WL}/${id}`);
export const removeFromWatchlist = (id) => axios.delete(`${WL}/${id}`);
