package com.qatarairways.service;

import com.qatarairways.model.Booking;
import com.qatarairways.model.Flight;
import com.qatarairways.model.User;
import com.qatarairways.repository.BookingRepository;
import com.qatarairways.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final FlightRepository flightRepository;

    public BookingService(BookingRepository bookingRepository, FlightRepository flightRepository) {
        this.bookingRepository = bookingRepository;
        this.flightRepository = flightRepository;
    }

    public Booking createBooking(User user, Long flightId, int passengers) {
        Flight flight = flightRepository.findById(flightId)
            .orElseThrow(() -> new RuntimeException("Flight not found: " + flightId));

        if (flight.getAvailableSeats() < passengers) {
            throw new RuntimeException("Not enough available seats. Requested: " +
                passengers + ", Available: " + flight.getAvailableSeats());
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFlight(flight);
        booking.setPassengerCount(passengers);
        booking.setTotalPrice(flight.getPrice().multiply(java.math.BigDecimal.valueOf(passengers)));
        booking.setStatus("confirmed");

        flight.setAvailableSeats(flight.getAvailableSeats() - passengers);
        flightRepository.save(flight);

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Booking getBookingByReference(String reference) {
        return bookingRepository.findByBookingReference(reference)
            .orElseThrow(() -> new RuntimeException("Booking not found: " + reference));
    }

    public Booking cancelBooking(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findByIdAndUserId(bookingId, userId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus().equals("cancelled")) {
            throw new RuntimeException("Booking is already cancelled");
        }

        booking.setStatus("cancelled");

        Flight flight = booking.getFlight();
        flight.setAvailableSeats(flight.getAvailableSeats() + booking.getPassengerCount());
        flightRepository.save(flight);

        return bookingRepository.save(booking);
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found: " + id));
    }
}