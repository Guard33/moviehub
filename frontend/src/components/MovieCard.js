import React from "react";
import "../styles.css";

export default function MovieCard({ movie, isWatchlisted, toggleWatchlist }) {
  const fallbackImage = "images/default.jpg";
  const imageSource = `images/${movie.image}`;

  const onImageFail = (e) => {
    e.currentTarget.src = fallbackImage;
  };

  const classifyRating = (value) => {
    const score = parseFloat(value);
    if (score >= 8) return "rating-good";
    if (score >= 5) return "rating-ok";
    return "rating-bad";
  };

  const isChecked = Boolean(isWatchlisted);
  const labelText = isChecked ? "In Watchlist" : "Add to Watchlist";

  return (
    <div className="movie-card" key={movie.id}>
      <img
        src={imageSource}
        alt={movie.title}
        onError={onImageFail}
      />

      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>

        <div className="movie-meta">
          <span className="movie-card-genre">{movie.genre}</span>
          <span className={`movie-card-rating ${classifyRating(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => toggleWatchlist(movie.id)}
          />
          <span className="slider">
            <span className="slider-label">{labelText}</span>
          </span>
        </label>
      </div>
    </div>
  );
}
