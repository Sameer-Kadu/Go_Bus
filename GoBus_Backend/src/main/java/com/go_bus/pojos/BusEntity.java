package com.go_bus.pojos;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "bus_tb")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class BusEntity {

	@Id
	@Column(name = "rto_reg_no", length = 10, unique = true)
	private String rtoRegNo;

	@ManyToOne
	@JoinColumn(name = "operator_id")
	private UserEntity operator;

	@Column(name = "seat_capacity")

	private int seatCapacity;

	@Column(name = "is_ac")
	private boolean isAc;

	@Column(name = "is_active")
	private boolean isActive;

	@Column(name = "is_sleeper")
	private boolean isSleeper;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "bus_amenity_no")
	private BusAmenitiesEntity busAmenitiesId;

	@OneToMany(mappedBy = "rto", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonManagedReference
	private List<BusScheduleEntity> schedules = new ArrayList<>();

	public void addSchedule(BusScheduleEntity schedule) {
		schedules.add(schedule);
		schedule.setRto(this);
	}
}
