package com.go_bus.pojos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="booking_tb")
public class BookingEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bookingId;
	
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="schedule_id")
	private BusScheduleEntity scheduleId;
	
    //unidirectional
	//customer_Id
	@ManyToOne
	@JoinColumn(name="cust_id")
	private UserEntity id;
	
	
    @Column(name="date_of_booking")
    private LocalDate dateOfBooking;
    
    @Column(name="time_of_booking")
    private LocalTime timeOfBooking;
    
    @Column(name="payment_status")
    private boolean paymentStatus;
    
    @Column(name="transaction_id")
    private String transactioId;
    
	
	@Column(name="total_amount") 
	private double totalAmount;
	
	
	//1.booked  2.cancelled 3.completed
	@Column(name = "booking_status")
	private String status; 
	
	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(
		    name = "passenger_tb",  // This is the table that will hold the passenger details.
		    joinColumns = @JoinColumn(name = "booking_id")  // FK to BookingEntity.
		)
    private List<PassengerEntity> passengerEntities = new ArrayList<>();
}
