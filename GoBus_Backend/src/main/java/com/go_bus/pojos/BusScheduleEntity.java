package com.go_bus.pojos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.criteria.Fetch;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "bus_schedule_tb")
public class BusScheduleEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long scheduleId;

	@ManyToOne
	@JoinColumn(name="rto_reg_number")
	@JsonBackReference
    private BusEntity rto;

	@Column(name = "boarding_point")
	private String boardingPoint;

	@Column(name = "destination_point")
	private String destinationPoint;

	@Column(name = "available_seats")
	private int availableSeats;

	@Column(name = "departure_date")
	private LocalDate departureDate;

	@Column(name = "arrival_date")
	private LocalDate arrivalDate;

	@Column(name = "departure_time")
	private LocalTime departureTime;
	@Column(name = "arrival_time")
	private LocalTime arrivalTime;

	@Column(name = "source_city")
	private String sourceCity;

	@Column(name = "destination_city")
	private String destinationCity;

	@Column(name = "bus_fare")
	private double busFare;
	
	@CollectionTable(name = "seat_entities")
	@ElementCollection(targetClass = SeatAllocationEntity.class ,fetch = FetchType.EAGER)
	private List<SeatAllocationEntity>  seatAllocationEntities = new ArrayList<>();

	// boolean isBooked, int seatNo, Gender travellerGender
	public void initializeSeat() {

		for (int i = 0; i < rto.getSeatCapacity(); i++) {
			seatAllocationEntities.add(new SeatAllocationEntity(false, i, Gender.NOTASSIGNED));
		}

	}

	@Override
	public int hashCode() {
		return Objects.hash(scheduleId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BusScheduleEntity other = (BusScheduleEntity) obj;
		return Objects.equals(scheduleId, other.scheduleId);
	}

}
