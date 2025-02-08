package com.go_bus.pojos;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@Embeddable
public class PassengerEntity {
	@Column(name="traveller_gender")
	private Gender Travellergender;
	
	@Column(name="full_name")
	private String fullName;
	
	@Column(name="seat_no")
	private int seatNo;
}
