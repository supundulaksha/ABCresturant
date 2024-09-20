package com.abcrestaurant.Backend.service;

import com.abcrestaurant.Backend.entity.Booking;
import com.abcrestaurant.Backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    public Booking updateBooking(Long id, Booking updatedBooking) {
        if (bookingRepository.existsById(id)) {
            updatedBooking.setId(id); // Ensure the ID is set for the update
            return bookingRepository.save(updatedBooking);
        } else {
            throw new RuntimeException("Booking with ID " + id + " does not exist.");
        }
    }
}