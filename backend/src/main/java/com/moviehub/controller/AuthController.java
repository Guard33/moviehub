package com.moviehub.controller;

import com.moviehub.model.AppUser;
import com.moviehub.repository.AppUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://3.146.37.153", allowCredentials = "true")
public class AuthController {

    private final AppUserRepository users;
    private final PasswordEncoder encoder;

    public AuthController(AppUserRepository users, PasswordEncoder encoder) {
        this.users = users; this.encoder = encoder;
    }
    @GetMapping("/me")
    public ResponseEntity<?> me(@org.springframework.security.core.annotation.AuthenticationPrincipal
                                org.springframework.security.core.userdetails.User user) {
        if (user == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(java.util.Map.of("username", user.getUsername()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String,String> body) {
        String username = body.get("username");
        String password = body.get("password");
        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message","Missing username or password"));
        }
        if (users.existsByUsername(username)) {
            return ResponseEntity.status(409).body(Map.of("message","Username already taken"));
        }
        users.save(new AppUser(username, encoder.encode(password)));
        return ResponseEntity.ok(Map.of("username", username));
    }
}
