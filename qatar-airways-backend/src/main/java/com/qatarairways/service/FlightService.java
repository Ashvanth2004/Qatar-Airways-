package com.qatarairways.service;

import com.qatarairways.model.Flight;
import com.qatarairways.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public List<Flight> searchFlights(String origin, String destination, LocalDate date,
                                       String cabinClass, int passengers) {
        return flightRepository.searchFlights(origin, destination, date, cabinClass, passengers);
    }

    public Flight getFlightById(Long id) {
        return flightRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Flight not found: " + id));
    }

    public List<String> getDestinations() {
        return flightRepository.findAllDestinations();
    }

    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }
}