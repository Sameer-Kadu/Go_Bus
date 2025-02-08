package com.go_bus.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingDTO {
    private LocalDate dateOfBooking;
    private LocalTime timeOfBooking;
    private boolean paymentStatus;
    private String bookingStatus;
    private double totalAmount;
    private String transactionId;
    private Long ScheduleId;
    private String email;
    private List<SeatAllocationDTO> seatAllocation;
    private List<PassengerDTO> passengers;
}
