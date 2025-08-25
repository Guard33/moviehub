package com.moviehub.service;

import com.moviehub.model.Movie;
import com.moviehub.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final MovieRepository repo;

    public MovieService(MovieRepository repo) {
        this.repo = repo;
    }

    public List<Movie> getAll() {
        return repo.findAll();
    }

    public Movie save(Movie movie) {
        return repo.save(movie);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }

    public Movie update(String id, Movie updated) {
        Movie movie = repo.findById(id).orElseThrow();
        movie.setTitle(updated.getTitle());
        movie.setDescription(updated.getDescription());
        movie.setWatched(updated.isWatched());
        return repo.save(movie);
    }
}
