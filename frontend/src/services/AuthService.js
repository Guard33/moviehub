// frontend/src/services/AuthService.js
import axios from "axios";

// Prefer env var for flexibility; fall back to your EC2 public IP.
const BASE = process.env.REACT_APP_API_BASE || "http://3.146.37.153:8080";

// One axios instance so we don't forget withCredentials anywhere.
const api = axios.create({
  baseURL: BASE,
  withCredentials: true, // send/receive cookies for session auth
});

// Who am I?
export const getMe = () => api.get("/api/auth/me");

// Logout (Spring Security default)
export const logout = () => api.post("/logout");
s