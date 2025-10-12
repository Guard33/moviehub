package com.moviehub.controller;

import com.moviehub.model.AppUser;
import com.moviehub.repository.AppUserRepository;
import com.moviehub.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://3.146.37.153", allowCredentials = "true")
public class AuthController {

    private final AppUserRepository users;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    public AuthController(AppUserRepository users, PasswordEncoder encoder,
                          AuthenticationManager authManager, JwtUtil jwtUtil) {
        this.users = users;
        this.encoder = encoder;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Missing username or password"));
        }
        if (users.existsByUsername(username)) {
            return ResponseEntity.status(409).body(Map.of("message", "Username already taken"));
        }
        users.save(new AppUser(username, encoder.encode(password)));
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        String token = jwtUtil.generateToken(username);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {
        if (auth == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(Map.of("username", auth.getName()));
    }
}
