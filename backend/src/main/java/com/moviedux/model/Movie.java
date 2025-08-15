package com.moviedux.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "movies")
public class Movie {

    @Id
    private String id;

    private String title;
    private String description;
    private String image;
    private String genre;
    private String rating;   // <-- rating as String to match your seed
    private boolean watched;

    public Movie() {}  // required by Spring Data

    // ✅ All-args constructor used by your seed (without id)
    public Movie(String title, String description, String image,
                 String genre, String rating, boolean watched) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.genre = genre;
        this.rating = rating;
        this.watched = watched;
    }

    // getters/setters …
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getRating() { return rating; }
    public void setRating(String rating) { this.rating = rating; }

    public boolean isWatched() { return watched; }
    public void setWatched(boolean watched) { this.watched = watched; }
}
