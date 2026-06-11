package com.qatarairways.controller;

import com.qatarairways.dto.LoginRequest;
import com.qatarairways.dto.RegisterRequest;
import com.qatarairways.model.User;
import com.qatarairways.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins:*}")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User user = authService.register(request.getFullName(), request.getEmail(), request.getPassword());
            return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of(
                    "id", user.getId(),
                    "email", user.getEmail(),
                    "fullName", user.getFullName(),
                    "aviosBalance", user.getAviosBalance(),
                    "loyaltyTier", user.getLoyaltyTier()
                )
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false, "message", e.getMessage()
            ));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            User user = authService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of(
                    "id", user.getId(),
                    "email", user.getEmail(),
                    "fullName", user.getFullName(),
                    "aviosBalance", user.getAviosBalance(),
                    "loyaltyTier", user.getLoyaltyTier()
                )
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false, "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        return authService.findByEmail(email)
            .map(user -> ResponseEntity.ok(Map.of("success", true, "data", user)))
            .orElse(ResponseEntity.notFound().build());
    }
}