package com.qatarairways.controller;

import com.qatarairways.model.Booking;
import com.qatarairways.model.User;
import com.qatarairways.service.BookingService;
import com.qatarairways.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "${app.cors.allowed-origins:*}")
public class BookingController {

    private final BookingService bookingService;
    private final AuthService authService;

    public BookingController(BookingService bookingService, AuthService authService) {
        this.bookingService = bookingService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> body) {
        try {
            String email = (String) body.get("email");
            Long flightId = Long.valueOf(body.get("flightId").toString());
            int passengers = Integer.parseInt(body.get("passengers").toString());

            User user = authService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

            Booking booking = bookingService.createBooking(user, flightId, passengers);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of(
                    "id", booking.getId(),
                    "bookingReference", booking.getBookingReference(),
                    "status", booking.getStatus(),
                    "totalPrice", booking.getTotalPrice(),
                    "passengerCount", booking.getPassengerCount(),
                    "flight", booking.getFlight(),
                    "createdAt", booking.getCreatedAt()
                )
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false, "message", e.getMessage()
            ));
        }
    }

    @GetMapping
    public ResponseEntity<?> getUserBookings(@RequestParam String email) {
        try {
            User user = authService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

            var bookings = bookingService.getUserBookings(user.getId());
            return ResponseEntity.ok(Map.of("success", true, "data", bookings));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false, "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/{reference}")
    public ResponseEntity<?> getBookingByReference(@PathVariable String reference) {
        try {
            Booking booking = bookingService.getBookingByReference(reference);
            return ResponseEntity.ok(Map.of("success", true, "data", booking));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id, @RequestParam String email) {
        try {
            User user = authService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

            Booking booking = bookingService.cancelBooking(id, user.getId());
            return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of("id", booking.getId(), "status", booking.getStatus())
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false, "message", e.getMessage()
            ));
        }
    }
}