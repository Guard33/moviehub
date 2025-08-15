import axios from "axios";

// same-origin: no base URL
export const getMe  = () =>
  axios.get("/api/auth/me", { withCredentials: true });

export const login = (username, password) =>
  axios.post(
    "/login",
    new URLSearchParams({ username, password }), // form-encoded (required)
    {
      withCredentials: true,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );

export const logout = () =>
  axios.post("/logout", null, { withCredentials: true });
