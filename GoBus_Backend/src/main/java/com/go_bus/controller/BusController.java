package com.go_bus.controller;


import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.go_bus.dto.BookingDTO;
import com.go_bus.dto.PassengerDTO;
import com.go_bus.pojos.BookingEntity;
import com.go_bus.pojos.BusScheduleEntity;
import com.go_bus.pojos.Gender;
import com.go_bus.pojos.PassengerEntity;
import com.go_bus.pojos.SeatAllocationEntity;
import com.go_bus.pojos.UserEntity;
import com.go_bus.service.BookingService;
import com.go_bus.service.BusScheduleService;
import com.go_bus.service.EmailService;
import com.go_bus.service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/bus")
public class BusController {

	@Autowired
	private BusScheduleService busScheduleService;
	
	  @Autowired
	    private BookingService bookingService;

	    @Autowired
	    private UserService userService;
	
	    @Autowired
	    private EmailService emailService;
	
	@GetMapping("/search")
	public ResponseEntity<?> searchBuses(
	        @RequestParam String source,
	        @RequestParam String destination,
	        @RequestParam String date) { // Accept date as String

	  
	        LocalDate formattedDate = LocalDate.parse(date);

	        System.out.println("Source: " + source + ", Destination: " + destination + ", Date: " + formattedDate);

	        return ResponseEntity.ok(busScheduleService.getBus(source, destination, formattedDate));

	   
	}
	
	@PostMapping("/booking")
	public ResponseEntity<?> createBooking(@RequestBody BookingDTO bookingDTO) {
	    try {
	        // 1️⃣ Fetch Bus Schedule based on scheduleId
	        Optional<BusScheduleEntity> scheduleOpt = busScheduleService.findById(bookingDTO.getScheduleId());
	        if (scheduleOpt.isEmpty()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Schedule not found");
	        }
	        BusScheduleEntity schedule = scheduleOpt.get();

	        // 2️⃣ Fetch User (Customer) based on email
	        UserEntity userEntity = userService.findByEmail(bookingDTO.getEmail());
	        if (userEntity == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	        }

	        // 3️⃣ Create Booking Entity (Without Passengers & Seats)
	        BookingEntity booking = new BookingEntity();
	        booking.setScheduleId(schedule);
	        booking.setId(userEntity);
	        booking.setDateOfBooking(bookingDTO.getDateOfBooking());
	        booking.setTimeOfBooking(bookingDTO.getTimeOfBooking());
	        booking.setPaymentStatus(bookingDTO.isPaymentStatus());
	        booking.setTotalAmount(bookingDTO.getTotalAmount());
	        booking.setTransactioId(bookingDTO.getTransactionId());
	        booking.setStatus(bookingDTO.getBookingStatus());

	        // 🔹 Step 1: Save Booking First (So bookingId is generated)
	        bookingService.saveBooking(booking);

	        // 4️⃣ Convert PassengerDTO to PassengerEntity
	        List<PassengerEntity> passengers = bookingDTO.getPassengers().stream().map(p -> {
	            PassengerEntity passenger = new PassengerEntity();
	            passenger.setFullName(p.getPassengerName());
	            passenger.setTravellergender(Gender.valueOf(p.getPassengerGender().toUpperCase()));
	            passenger.setSeatNo(p.getSeatNo());
	            return passenger;
	        }).collect(Collectors.toList());
	        booking.setPassengerEntities(passengers);

	        // 🔹 Step 2: Update Booking with Passengers
	        bookingService.saveBooking(booking);

	        // 5️⃣ Update Seat Allocation
	        List<Integer> bookedSeats = bookingDTO.getPassengers().stream()
	                .map(PassengerDTO::getSeatNo)  // Extract seat numbers from passengers
	                .collect(Collectors.toList());

	        List<SeatAllocationEntity> updatedSeats = schedule.getSeatAllocationEntities().stream()
	                .map(seat -> {
	                    if (bookedSeats.contains(seat.getSeatNo())) {
	                        seat.setBooked(true);  // Mark seat as booked
	                        seat.setTravellerGender(Gender.valueOf(bookingDTO.getPassengers().stream()
	                                .filter(p -> p.getSeatNo() == seat.getSeatNo())
	                                .findFirst().get().getPassengerGender().toUpperCase()));
	                    }
	                    return seat;
	                }).collect(Collectors.toList());

	        schedule.setSeatAllocationEntities(updatedSeats);
	        busScheduleService.save(schedule);
	        
	        String feedbackLink = "https://go-bus-oarm.vercel.app/feedback?bookingId=" + booking.getBookingId();
System.out.println("-------------"+feedbackLink+"-----------------");

	        List<Map<String, String>> passengerDetails = booking.getPassengerEntities().stream()
	        	    .map(passenger -> Map.of(
	        	        "name", passenger.getFullName(),
	        	        "gender", passenger.getTravellergender().toString(),
	        	        "seatNo", String.valueOf(passenger.getSeatNo())
	        	    ))
	        	    .collect(Collectors.toList());
	        
	        
	        // Send HTML email with passenger details
	        emailService.sendBookingConfirmation(
	                userEntity.getEmail(),
	                userEntity.getName(),
	                schedule.getRto().getRtoRegNo(),
	                schedule.getSourceCity() + " → " + schedule.getDestinationCity(),
	                schedule.getDepartureDate().toString(),
	                schedule.getDepartureTime().toString(),
	                passengerDetails,
	                feedbackLink
	        );
	        
	        // Save the updated schedule with allocated seats

	        return ResponseEntity.ok("Booking successfully created and seats updated!");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing booking: " + e.getMessage());
	    }
	}




	
}
