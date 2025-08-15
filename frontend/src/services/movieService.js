import axios from "axios";

// movies do not strictly need cookies, but harmless if enabled
const api = axios.create({
  baseURL: "/",            // Nginx will proxy /movies -> backend:8080/movies
  withCredentials: true,
});

export const getMovies    = () => api.get("/movies");
export const addMovie     = (movie) => api.post("/movies", movie);
export const deleteMovie  = (id) => api.delete(`/movies/${id}`);
export const updateMovie  = (id, payload) => api.patch(`/movies/${id}`, payload);
