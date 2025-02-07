package com.go_bus.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BusDTO {

	// Original fields
	private String status;

	// Additional fields
	private String rtoRegNo;
	private boolean ac;
	private boolean sleeper;
	private int seatCapacity;
	private boolean chargingPoint;
	private boolean complementaryFood;
	private boolean sheetPelow;
	private boolean toilet;
	private boolean wifi;
	private LocalDate arrivalDate;
	private LocalTime arrivalTime;
	private String boardingPoint;
	private Double busFare;
	private LocalDate departureDate;
	private LocalTime departureTime;
	private String destinationCity;
	private String destinationPoint;
	private String sourceCity;
}
