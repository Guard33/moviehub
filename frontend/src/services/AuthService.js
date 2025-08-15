import axios from "axios";

// all auth calls include cookies (session) by default
const auth = axios.create({
  baseURL: "/api",         // Nginx will proxy /api -> backend:8080/api
  withCredentials: true,   // send/receive cookies
});

export const getMe  = () => auth.get("/auth/me");
export const logout = () => auth.post("/logout", null);
