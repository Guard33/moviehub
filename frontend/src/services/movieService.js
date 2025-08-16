import axios from "axios";

// Movies controller is mounted at /movies (no /api prefix)
const MOVIES = "/api/movies";

export const getMovies = () =>
  axios.get(MOVIES, { withCredentials: true });

export const addMovie = (movie) =>
  axios.post(MOVIES, movie, { withCredentials: true });

export const deleteMovie = (id) =>
  axios.delete(`${MOVIES}/${id}`, { withCredentials: true });

export const updateMovie = (id, payload) =>
  axios.patch(`${MOVIES}/${id}`, payload, { withCredentials: true });
