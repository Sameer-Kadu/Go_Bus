package com.go_bus.pojos;




import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Embeddable
public class SeatAllocationEntity {
	
	 @Column(name="is_booked")
		private boolean isBooked;
		
	    @Column(name="seat_no")
		private int seatNo;
	    
		@Enumerated(EnumType.STRING)
	    @Column(name="traveller_gender")
		private Gender travellerGender;
	    
	    public SeatAllocationEntity(boolean isBooked, int seatNo, Gender travellerGender) {
			super();
			this.isBooked = isBooked;
			this.seatNo = seatNo;
			this.travellerGender = travellerGender;
		}
}
