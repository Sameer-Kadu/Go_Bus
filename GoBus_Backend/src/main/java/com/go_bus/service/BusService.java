package com.go_bus.service;

import java.time.LocalDate;
import java.util.List;

import com.go_bus.dto.TravelerBusDTO;
import com.go_bus.pojos.BusEntity;
import com.go_bus.pojos.SeatAllocationEntity;

public interface BusService {
	public BusEntity addBus(BusEntity busEntity);
	public List<SeatAllocationEntity> getSeatAllocationList(Long id);

	
}
