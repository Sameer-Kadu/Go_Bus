package com.go_bus.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeatAllocationDTO {
    private boolean isBooked;
    private int seatNo;
    private String travellerGender;
}
