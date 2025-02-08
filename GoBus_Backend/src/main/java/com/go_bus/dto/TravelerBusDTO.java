package com.go_bus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.go_bus.pojos.BusAmenitiesEntity;
import com.go_bus.pojos.SeatAllocationEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TravelerBusDTO {
private Long scheduleId;
	
    private String sourceCity;
    
    private String destinationCity;
    
    private LocalDate departureDate;
	
    private LocalDate arrivalDate;
    
	private String agencyName;
	
	private boolean isAc;
	
	private boolean isSleeper;
	
	private BusAmenitiesEntity busAmenities;
	
	private double busFare;
	
	private LocalTime arrivalTime;
	
	private LocalTime departureTime;
	
	private List<SeatAllocationEntity> seats;
	
    private String boardingPoint;   
    
    private String destinationPoint;
}
