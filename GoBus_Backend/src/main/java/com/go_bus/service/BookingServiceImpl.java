package com.go_bus.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.go_bus.pojos.BookingEntity;
import com.go_bus.repository.BookingRepository;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

	 @Autowired
	    private BookingRepository bookingRepository;

	    public void saveBooking(BookingEntity booking) {
	        bookingRepository.save(booking);
	    }

		@Override
		public Optional<BookingEntity> findById(Long bookingId) {
			// TODO Auto-generated method stub
			return bookingRepository.findById(bookingId);
		}

}
