package com.go_bus.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class OperatorBusinessDetails {
	@Column(length=50)
	private String city;
	
	@Column(name="pin_code",length=6)
	private int pinCode;
	
	
	private String area;
	
	private String address;
}
