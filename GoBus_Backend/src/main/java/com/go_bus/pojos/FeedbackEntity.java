package com.go_bus.pojos;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "feedback_tb")
@Getter
@Setter
public class FeedbackEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private BookingEntity booking;

    private int rating;
    private String review;
}
