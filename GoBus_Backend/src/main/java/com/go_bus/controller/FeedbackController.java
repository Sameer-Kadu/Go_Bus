package com.go_bus.controller;

import com.go_bus.dto.FeedbackDTO;
import com.go_bus.pojos.BookingEntity;
import com.go_bus.pojos.FeedbackEntity;
import com.go_bus.service.BookingService;
import com.go_bus.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<?> submitFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        Optional<BookingEntity> bookingOpt = bookingService.findById(feedbackDTO.getBookingId());
        if (bookingOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found.");
        }

        BookingEntity booking = bookingOpt.get();
        FeedbackEntity feedback = new FeedbackEntity();
        feedback.setBooking(booking);
        feedback.setRating(feedbackDTO.getRating());
        feedback.setReview(feedbackDTO.getReview());

        feedbackService.saveFeedback(feedback);

        return ResponseEntity.ok("Feedback submitted successfully!");
    }
}
