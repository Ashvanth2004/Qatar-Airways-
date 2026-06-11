package com.qatarairways.controller;

import com.qatarairways.model.Flight;
import com.qatarairways.service.FlightService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "${app.cors.allowed-origins:*}")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchFlights(
            @RequestParam String origin,
            @RequestParam String destination,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(defaultValue = "1") int passengers,
            @RequestParam(defaultValue = "Economy") String cabinClass) {

        var flights = flightService.searchFlights(origin, destination, date, cabinClass, passengers);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "data", flights,
            "meta", Map.of("count", flights.size())
        ));
    }

    @GetMapping
    public ResponseEntity<?> getAllFlights() {
        var flights = flightService.getAllFlights();
        return ResponseEntity.ok(Map.of("success", true, "data", flights));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFlight(@PathVariable Long id) {
        try {
            Flight flight = flightService.getFlightById(id);
            return ResponseEntity.ok(Map.of("success", true, "data", flight));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/destinations")
    public ResponseEntity<?> getDestinations() {
        var destinations = flightService.getDestinations();
        return ResponseEntity.ok(Map.of("success", true, "data", destinations));
    }

    @PostMapping
    public ResponseEntity<?> addFlight(@RequestBody Flight flight) {
        Flight saved = flightService.addFlight(flight);
        return ResponseEntity.ok(Map.of("success", true, "data", saved));
    }
}