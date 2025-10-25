import axios from "axios";
import jwtDecode from "jwt-decode"; // 👈 install this if you haven’t: npm install jwt-decode

const API = "http://3.146.37.153/api/auth";

// --- Helper: check if JWT is expired ---
function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000; // true if expired
  } catch {
    return true; // treat invalid tokens as expired
  }
}

export const register = (username, password) =>
  axios.post(`${API}/register`, { username, password });

export const login = async (username, password) => {
  const res = await axios.post(`${API}/login`, { username, password });
  const token = res.data.token;
  localStorage.setItem("jwt", token);
  return token;
};

export const getMe = async () => {
  const token = localStorage.getItem("jwt");

  // 👇 auto-clear expired token before calling backend
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("jwt");
    throw new Error("Session expired — please log in again.");
  }

  const res = await axios.get(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("jwt");
};
