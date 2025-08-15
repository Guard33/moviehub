// src/main/java/com/moviedux/controller/LoginOkController.java
package com.moviedux.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class LoginOkController {
    @GetMapping("/login-success")
    public ResponseEntity<?> ok() {
        return ResponseEntity.ok(Map.of("status", "ok"));
    }
}
