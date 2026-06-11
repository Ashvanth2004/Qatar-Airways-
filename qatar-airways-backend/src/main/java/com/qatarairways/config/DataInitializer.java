package com.qatarairways.config;

import com.qatarairways.model.Flight;
import com.qatarairways.repository.FlightRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final FlightRepository flightRepository;

    public DataInitializer(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @Override
    public void run(String... args) {
        if (flightRepository.count() > 0) return;

        // Sample flights
        flightRepository.save(createFlight("QR001", "DOH", "LHR", 2, 5, new BigDecimal("450.00"), "Economy", 120));
        flightRepository.save(createFlight("QR002", "DOH", "LHR", 2, 5, new BigDecimal("1200.00"), "Business", 30));
        flightRepository.save(createFlight("QR003", "DOH", "JFK", 2, 5, new BigDecimal("550.00"), "Economy", 100));
        flightRepository.save(createFlight("QR004", "DOH", "JFK", 2, 5, new BigDecimal("1500.00"), "Business", 25));
        flightRepository.save(createFlight("QR005", "LHR", "DOH", 3, 5, new BigDecimal("420.00"), "Economy", 110));
        flightRepository.save(createFlight("QR006", "LHR", "JFK", 3, 5, new BigDecimal("380.00"), "Economy", 130));
        flightRepository.save(createFlight("QR007", "JFK", "DOH", 4, 5, new BigDecimal("530.00"), "Economy", 90));
        flightRepository.save(createFlight("QR008", "JFK", "LHR", 4, 5, new BigDecimal("400.00"), "Economy", 140));
        flightRepository.save(createFlight("QR009", "DOH", "CDG", 2, 6, new BigDecimal("480.00"), "Economy", 95));
        flightRepository.save(createFlight("QR010", "DOH", "CDG", 2, 6, new BigDecimal("1300.00"), "Business", 20));
        flightRepository.save(createFlight("QR011", "DOH", "DXB", 2, 6, new BigDecimal("150.00"), "Economy", 200));
        flightRepository.save(createFlight("QR012", "DOH", "SYD", 2, 7, new BigDecimal("800.00"), "Economy", 80));
        flightRepository.save(createFlight("QR013", "DOH", "SIN", 2, 7, new BigDecimal("350.00"), "Economy", 150));
        flightRepository.save(createFlight("QR014", "DOH", "KUL", 2, 7, new BigDecimal("300.00"), "Economy", 160));
        flightRepository.save(createFlight("QR015", "DOH", "IST", 2, 7, new BigDecimal("280.00"), "Economy", 170));

        System.out.println("✓ Sample flight data loaded (" + flightRepository.count() + " flights)");
    }

    private Flight createFlight(String number, String origin, String dest, int dayOffset, int hour,
                                 BigDecimal price, String cabin, int seats) {
        Flight f = new Flight();
        f.setFlightNumber(number);
        f.setOrigin(origin);
        f.setDestination(dest);
        f.setDepartureTime(LocalDateTime.now().plusDays(dayOffset).withHour(hour).withMinute(0).withSecond(0));
        f.setArrivalTime(LocalDateTime.now().plusDays(dayOffset).withHour(hour + 6).withMinute(30).withSecond(0));
        f.setCabinClass(cabin);
        f.setPrice(price);
        f.setCurrency("USD");
        f.setAvailableSeats(seats);
        return f;
    }
}