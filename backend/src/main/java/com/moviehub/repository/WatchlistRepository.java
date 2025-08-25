package com.moviehub.repository;

import com.moviehub.model.WatchlistItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WatchlistRepository extends MongoRepository<WatchlistItem, String> {
    boolean existsByUsernameAndMovieId(String username, String movieId);
    void deleteByUsernameAndMovieId(String username, String movieId);
    List<WatchlistItem> findByUsername(String username);
}
