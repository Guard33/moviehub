import axios from "axios";

const BASE = "http://3.146.37.153:8080";

export const getMe   = () => axios.get(`${BASE}/api/auth/me`, { withCredentials: true });
export const logout  = () => axios.post(`${BASE}/logout`, null, { withCredentials: true });
