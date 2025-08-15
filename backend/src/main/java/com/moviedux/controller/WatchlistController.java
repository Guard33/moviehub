package com.moviedux.controller;

import com.moviedux.model.WatchlistItem;
import com.moviedux.repository.WatchlistRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/watchlist")
@CrossOrigin(origins = "http://3.146.37.153", allowCredentials = "true")
public class WatchlistController {

    private final WatchlistRepository repo;
    public WatchlistController(WatchlistRepository repo) { this.repo = repo; }

    @GetMapping
    public ResponseEntity<?> getMine(Authentication auth) {
        String username = auth.getName();
        List<WatchlistItem> items = repo.findByUsername(username);
        return ResponseEntity.ok(items.stream().map(WatchlistItem::getMovieId).toList());
    }

    @PostMapping("/{movieId}")
    public ResponseEntity<?> add(Authentication auth, @PathVariable String movieId) {
        String username = auth.getName();
        if (!repo.existsByUsernameAndMovieId(username, movieId)) {
            repo.save(new WatchlistItem(username, movieId));
        }
        return ResponseEntity.ok(Map.of("movieId", movieId, "saved", true));
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<?> remove(Authentication auth, @PathVariable String movieId) {
        String username = auth.getName();
        repo.deleteByUsernameAndMovieId(username, movieId);
        return ResponseEntity.noContent().build();
    }
}
