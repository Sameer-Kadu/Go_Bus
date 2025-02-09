package com.go_bus.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackDTO {
    private Long bookingId;
    private int rating;
    private String review;
}
