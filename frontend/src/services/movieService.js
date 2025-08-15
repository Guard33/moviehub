import axios from "axios";

const BASE = process.env.REACT_APP_API_BASE || "http://3.146.37.153:8080";
const api = axios.create({ baseURL: BASE, withCredentials: true });

export const getMovies       = () => api.get("/movies");
export const addMovie        = (movie) => api.post("/movies", movie);
export const deleteMovie     = (id) => api.delete(`/movies/${id}`);
export const updateMovie     = (id, payload) => api.patch(`/movies/${id}`, payload);
