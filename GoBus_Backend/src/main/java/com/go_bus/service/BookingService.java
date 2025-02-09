package com.go_bus.service;

import java.util.Optional;

import com.go_bus.pojos.BookingEntity;

public interface BookingService {
	

    public void saveBooking(BookingEntity booking);

	public Optional<BookingEntity> findById(Long bookingId);
}
