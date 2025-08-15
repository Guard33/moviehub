// src/components/Login.js
import { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const form = new URLSearchParams();
    form.append("username", username.trim());
    form.append("password", password);

    try {
      await axios.post("http://localhost:8080/login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      // force reload so App fetches /api/auth/me and shows “Signed in as …”
      window.location.href = redirectTo;
    } catch {
      setErr("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={submit} autoComplete="on">
        <div className="auth-brand">
          <div className="auth-logo-dot" />
          <h1 className="auth-title">Sign in</h1>
          <p className="auth-sub">Welcome back to MovieHub</p>
        </div>

        {err && <div className="auth-alert">{err}</div>}

        <label className="auth-label" htmlFor="login-username">Username</label>
        <input
          id="login-username"
          className="auth-input"
          placeholder="yourname"
          value={username}
          onChange={(e) => setU(e.target.value)}
          autoFocus
        />

        <label className="auth-label" htmlFor="login-password">Password</label>
        <div className="auth-input-group">
          <input
            id="login-password"
            className="auth-input"
            type={showPwd ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setP(e.target.value)}
          />
          <button
            type="button"
            className="auth-input-addon"
            onClick={() => setShowPwd((s) => !s)}
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="auth-btn"
          disabled={loading || !username || !password}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <div className="auth-links">
          <span>New here?</span>
          <Link to="/register">Create an account</Link>
        </div>
      </form>
    </div>
  );
}
