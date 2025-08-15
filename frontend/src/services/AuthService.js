import axios from "axios";

// All auth endpoints are under /api/auth
const AUTH = "/api/auth";

export const register = (username, password) =>
  axios.post(
    `${AUTH}/register`,
    { username, password },
    { withCredentials: true }
  );

export const getMe = () =>
  axios.get(`${AUTH}/me`, { withCredentials: true });

export const login = (username, password) =>
  axios.post(
    "/login",                                  // Spring Security formLogin
    new URLSearchParams({ username, password }), // form-encoded body
    {
      withCredentials: true,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

export const logout = () =>
  axios.post("/logout", null, { withCredentials: true });
