import axios from "axios";

const MOVIES = "http://3.146.37.153/api/movies";

const authHeader = () => {
  const token = localStorage.getItem("jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getMovies = () =>
  axios.get(MOVIES, { headers: authHeader() });

export const addMovie = (movie) =>
  axios.post(MOVIES, movie, { headers: authHeader() });

export const deleteMovie = (id) =>
  axios.delete(`${MOVIES}/${id}`, { headers: authHeader() });

export const updateMovie = (id, payload) =>
  axios.patch(`${MOVIES}/${id}`, payload, { headers: authHeader() });
