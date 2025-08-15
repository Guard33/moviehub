// src/components/Register.js
import { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function Register() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [confirm, setC] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");

    // simple client validation
    if (!username.trim() || !password) {
      setErr("Please enter a username and password.");
      return;
    }
    if (password !== confirm) {
      setErr("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setErr("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      // 1) create the account
      await axios.post("http://backend:8080/api/auth/register", {
        username: username.trim(),
        password,
      });

      // 2) auto-login (form-urlencoded)
      const form = new URLSearchParams();
      form.append("username", username.trim());
      form.append("password", password);

      await axios.post("http://backend:8080/login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });

      // 3) reload so App fetches /api/auth/me and shows “Signed in as …”
      window.location.href = redirectTo;
    } catch (e2) {
      // map common backend errors
      const status = e2?.response?.status;
      if (status === 409) setErr("That username is already taken.");
      else if (status === 400) setErr("Missing username or password.");
      else setErr("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={submit} autoComplete="on">
        <div className="auth-brand">
          <div className="auth-logo-dot" />
          <h1 className="auth-title">Create account</h1>
          <p className="auth-sub">Join MovieHub in seconds</p>
        </div>

        {err && <div className="auth-alert">{err}</div>}
        {ok && <div className="auth-alert" style={{borderColor:"#3ddc97", background:"#143226", color:"#d6ffea"}}>{ok}</div>}

        <label className="auth-label" htmlFor="reg-username">Username</label>
        <input
          id="reg-username"
          className="auth-input"
          placeholder="yourname"
          value={username}
          onChange={(e) => setU(e.target.value)}
          autoFocus
        />

        <label className="auth-label" htmlFor="reg-password">Password</label>
        <input
          id="reg-password"
          className="auth-input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setP(e.target.value)}
        />

        <label className="auth-label" htmlFor="reg-confirm">Confirm password</label>
        <input
          id="reg-confirm"
          className="auth-input"
          type="password"
          placeholder="••••••••"
          value={confirm}
          onChange={(e) => setC(e.target.value)}
        />

        <button type="submit" className="auth-btn" disabled={loading || !username || !password || !confirm}>
          {loading ? "Creating account…" : "Create account"}
        </button>

        <div className="auth-links">
          <span>Already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
}
