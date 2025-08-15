import React, { useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {
  console.log("MoviesGrid props -> movies:", movies?.length, "watchlist:", watchlist?.length);

  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleRatingChange = (e) => setRating(e.target.value);

  const matchesGenre = (movie, selected) => {
    if (!selected || selected === "All Genres") return true;
    const g = (movie?.genre || "").toLowerCase();
    return g === selected.toLowerCase();
  };

  const matchesSearchTerm = (movie, term) => {
    const title = (movie?.title || "").toLowerCase();
    return title.includes((term || "").toLowerCase());
  };

  const matchesRating = (movie, ratingFilter) => {
    if (ratingFilter === "All") return true;

    const r = Number(movie?.rating); // "7.5" -> 7.5
    if (Number.isNaN(r)) return false;

    switch (ratingFilter) {
      case "Good":
        return r >= 8;
      case "Ok":
        return r >= 5 && r < 8;
      case "Bad":
        return r < 5;
      default:
        return true;
    }
  };

  const filteredMovies = (movies || []).filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearchTerm(movie, searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>

        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.length === 0 ? (
          <div style={{ color: "#bbb", padding: "2rem" }}>No movies found.</div>
        ) : (
          filteredMovies.map((m) => {
            // normalize id so MovieCard can rely on movie.id
            const movieId = m.id ?? m._id;
            const normalized = m.id ? m : { ...m, id: movieId };

            return (
              <MovieCard
                key={movieId}
                movie={normalized}
                toggleWatchlist={toggleWatchlist}
                isWatchlisted={watchlist.includes(movieId)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
