package com.moviedux.controller;

import com.moviedux.model.Movie;
import com.moviedux.repository.MovieRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://3.146.37.153") // adjust if needed
public class MovieController {

    private final MovieRepository movieRepository;

    // Constructor injection
    public MovieController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    // --- basic endpoints ---

    @GetMapping
    public Iterable<Movie> list() {
        return movieRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> get(@PathVariable String id) {
        return movieRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Movie> create(@RequestBody Movie movie) {
        Movie saved = movieRepository.save(movie);
        return ResponseEntity.ok(saved);
    }

    // Full replace (PUT) — incoming.getRating() is String
    @PutMapping("/{id}")
    public ResponseEntity<Movie> replace(@PathVariable String id, @RequestBody Movie incoming) {
        Optional<Movie> existing = movieRepository.findById(id);
        if (existing.isEmpty()) return ResponseEntity.notFound().build();

        Movie m = existing.get();
        m.setTitle(incoming.getTitle());
        m.setDescription(incoming.getDescription());
        m.setImage(incoming.getImage());
        m.setGenre(incoming.getGenre());
        m.setRating(incoming.getRating());   // rating is String in Movie
        m.setWatched(incoming.isWatched());
        return ResponseEntity.ok(movieRepository.save(m));
    }

    // Flexible partial update (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<Movie> updatePartial(
            @PathVariable String id,
            @RequestBody Map<String, Object> body) {

        return movieRepository.findById(id)
                .map(movie -> {
                    if (body.containsKey("title"))       movie.setTitle((String) body.get("title"));
                    if (body.containsKey("description")) movie.setDescription((String) body.get("description"));
                    if (body.containsKey("image"))       movie.setImage((String) body.get("image"));
                    if (body.containsKey("genre"))       movie.setGenre((String) body.get("genre"));

                    // rating is stored as String in Movie
                    if (body.containsKey("rating")) {
                        Object r = body.get("rating");
                        movie.setRating(String.valueOf(r)); // accepts number or string
                    }

                    if (body.containsKey("watched")) {
                        movie.setWatched((Boolean) body.get("watched"));
                    }

                    Movie saved = movieRepository.save(movie);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (!movieRepository.existsById(id)) return ResponseEntity.notFound().build();
        movieRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
