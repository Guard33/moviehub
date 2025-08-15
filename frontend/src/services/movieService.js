import axios from "axios";

const API = "/api/movies";

export const getMovies     = () => axios.get(API, { withCredentials: true });
export const addMovie      = (movie) => axios.post(API, movie, { withCredentials: true });
export const deleteMovie   = (id) => axios.delete(`${API}/${id}`, { withCredentials: true });
export const updateMovie   = (id, payload) => axios.patch(`${API}/${id}`, payload, { withCredentials: true });
