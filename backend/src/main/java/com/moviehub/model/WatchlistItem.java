package com.moviehub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("watchlist")
public class WatchlistItem {
    @Id
    private String id;

    private String username; // who owns this item
    private String movieId;
    private Instant createdAt = Instant.now();

    public WatchlistItem() {}
    public WatchlistItem(String username, String movieId) {
        this.username = username;
        this.movieId = movieId;
    }

    public String getId() { return id; }
    public String getUsername() { return username; }
    public String getMovieId() { return movieId; }
    public Instant getCreatedAt() { return createdAt; }

    public void setId(String id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setMovieId(String movieId) { this.movieId = movieId; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
