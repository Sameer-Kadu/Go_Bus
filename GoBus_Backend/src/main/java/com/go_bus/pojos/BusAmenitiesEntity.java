package com.go_bus.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="bus_amenities_tb")
public class BusAmenitiesEntity {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long busAmenitiesId;
	
	 @Column(name="toilet")
	 private boolean toilet;
	 
	 @Column(name="charging_port")
	 private boolean chargingPort;
	 
	 @Column(name="wifi")
	 private boolean wifi;
	 
	 @Column(name="sheets_pillow")
	 private boolean sheetsPillow;
	 
	 @Column(name="complimentary_food")
	 private boolean complimentaryFood;
}
