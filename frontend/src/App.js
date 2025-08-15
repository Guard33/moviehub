// App.js
import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import Watchlist from "./components/Watchlist";
import Login from "./components/Login";
import Register from "./components/Register";
import Modal from "./components/Modal";

import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovies } from "./services/movieService";
import { getMyWatchlist, addToWatchlist, removeFromWatchlist } from "./services/WatchlistService";
import { getMe, logout } from "./services/AuthService";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]); // array of ids
  const [currentUser, setCurrentUser] = useState(null); // { username }
  const [needLoginOpen, setNeedLoginOpen] = useState(false);

  // Load movies (public)
  useEffect(() => {
    getMovies()
      .then((response) => {
        const backendMovies = response.data || [];
        const normalized = backendMovies.map(m => ({ ...m, id: m.id ?? m._id }));
        setMovies(normalized);
      })
      .catch((error) => console.error("Failed to fetch movies from backend:", error));
  }, []);

  // Check who is logged in & load their watchlist
  const fetchMeAndWatchlist = () => {
    getMe()
      .then(res => {
        const me = res.data;               // { username }
        setCurrentUser(me);
        return getMyWatchlist();
      })
      .then(res => {
        const ids = Array.isArray(res.data) ? res.data : [];
        setWatchlist(ids);
      })
      .catch(() => {
        setCurrentUser(null);
        setWatchlist([]);                  // not logged in
      });
  };
  useEffect(fetchMeAndWatchlist, []);

  // Toggle per-user watchlist
  const toggleWatchlist = (movieId) => {
    if (!currentUser) {
      setNeedLoginOpen(true);
      return;
    }
    const isIn = watchlist.includes(movieId);
    const op = isIn ? removeFromWatchlist(movieId) : addToWatchlist(movieId);

    op.then(() => {
      setWatchlist(prev => {
        if (isIn) return prev.filter(id => id !== movieId);
        return [...prev, movieId];
      });
    }).catch(err => {
      if (err?.response?.status === 401) setNeedLoginOpen(true);
      else console.error("Watchlist update failed:", err);
    });
  };

  // Logout
  const handleLogout = () => {
    logout()
      .then(() => {
        setCurrentUser(null);
        setWatchlist([]);
      })
      .catch(console.error);
  };

  return (
  <div className="App">
    {/* Router wraps EVERYTHING that might use <Link> or useNavigate */}
    <Router>
      <div className="container">
        <Header />

        <nav>
          <ul style={{ display:"flex", gap:12, alignItems:"center" }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/watchlist">Watchlist</Link></li>
            <div style={{ marginLeft:"auto", display:"flex", gap:12, alignItems:"center" }}>
              {currentUser ? (
                <>
                  <span style={{ opacity:.85 }}>
                    Signed in as <strong>{currentUser.username}</strong>
                  </span>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </div>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <MoviesGrid
                watchlist={watchlist}
                movies={movies}
                toggleWatchlist={toggleWatchlist}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                watchlist={watchlist}
                movies={movies}
                toggleWatchlist={toggleWatchlist}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />
      </div>

      {/* Modal MUST also be inside Router because it uses <Link> */}
      <Modal open={needLoginOpen} onClose={() => setNeedLoginOpen(false)}>
        <div style={{ fontSize:16 }}>You must be logged in to watchlist.</div>
        <div style={{ marginTop:10 }}>
          <Link to="/login">Go to Login</Link> &nbsp;|&nbsp; <Link to="/register">Create account</Link>
        </div>
      </Modal>
    </Router>
  </div>
);

}

export default App;
