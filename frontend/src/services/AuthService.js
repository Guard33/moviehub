import axios from "axios";

const API = "http://3.146.37.153/api/auth";

export const register = (username, password) =>
  axios.post(`${API}/register`, { username, password });

export const login = async (username, password) => {
  const res = await axios.post(`${API}/login`, { username, password });
  const token = res.data.token;
  localStorage.setItem("jwt", token);  // save token locally
  return token;
};

export const getMe = async () => {
  const token = localStorage.getItem("jwt");
  if (!token) throw new Error("No token found");
  const res = await axios.get(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("jwt");
};
