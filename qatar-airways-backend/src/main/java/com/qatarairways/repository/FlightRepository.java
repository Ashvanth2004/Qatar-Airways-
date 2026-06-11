package com.qatarairways.repository;

import com.qatarairways.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {

    List<Flight> findByOriginAndDestinationAndDepartureTimeBetween(
        String origin,
        String destination,
        LocalDateTime start,
        LocalDateTime end
    );

    @Query("SELECT f FROM Flight f WHERE f.origin = :origin " +
           "AND f.destination = :destination " +
           "AND DATE(f.departureTime) = :date " +
           "AND f.cabinClass = :cabinClass " +
           "AND f.availableSeats >= :passengers")
    List<Flight> searchFlights(
        @Param("origin") String origin,
        @Param("destination") String destination,
        @Param("date") LocalDate date,
        @Param("cabinClass") String cabinClass,
        @Param("passengers") int passengers
    );

    @Query("SELECT DISTINCT f.destination FROM Flight f ORDER BY f.destination")
    List<String> findAllDestinations();
}