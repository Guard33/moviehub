import React, { useState, useMemo } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid({ movies = [], watchlist = [], toggleWatchlist }) {
  const [filters, setFilters] = useState({
    search: "",
    genre: "All Genres",
    rating: "All",
  });

  const handleInputChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filterMovies = useMemo(() => {
    return movies.filter((movie) => {
      const title = (movie.title || "").toLowerCase();
      const genre = (movie.genre || "").toLowerCase();
      const rating = parseFloat(movie.rating);

      const searchMatch = title.includes(filters.search.toLowerCase());
      const genreMatch = filters.genre === "All Genres" || genre === filters.genre.toLowerCase();

      const ratingMatch =
        filters.rating === "All" ||
        (filters.rating === "Good" && rating >= 8) ||
        (filters.rating === "Ok" && rating >= 5 && rating < 8) ||
        (filters.rating === "Bad" && rating < 5);

      return searchMatch && genreMatch && ratingMatch;
    });
  }, [movies, filters]);

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={filters.search}
        onChange={(e) => handleInputChange("search", e.target.value)}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label htmlFor="genre-filter">Genre</label>
          <select
            id="genre-filter"
            className="filter-dropdown"
            value={filters.genre}
            onChange={(e) => handleInputChange("genre", e.target.value)}
          >
            {["All Genres", "Action", "Drama", "Fantasy", "Horror"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="filter-slot">
          <label htmlFor="rating-filter">Rating</label>
          <select
            id="rating-filter"
            className="filter-dropdown"
            value={filters.rating}
            onChange={(e) => handleInputChange("rating", e.target.value)}
          >
            {["All", "Good", "Ok", "Bad"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filterMovies.length === 0 ? (
          <div style={{ color: "#bbb", padding: "2rem" }}>
            No movies found.
          </div>
        ) : (
          filterMovies.map((movie) => {
            const id = movie.id ?? movie._id;
            return (
              <MovieCard
                key={id}
                movie={{ ...movie, id }}
                isWatchlisted={watchlist.includes(id)}
                toggleWatchlist={toggleWatchlist}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
