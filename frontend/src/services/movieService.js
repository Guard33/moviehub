import axios from 'axios';

const API_URL = 'http://3.146.37.153:8080/movies'; // Update to your backend URL in production

export const getMovies = () => axios.get(API_URL);

export const addMovie = (movie) => axios.post(API_URL, movie);

export const deleteMovie = (id) => axios.delete(`${API_URL}/${id}`);


export const updateMovie = (id, payload) => axios.patch(`${API_URL}/${id}`, payload);