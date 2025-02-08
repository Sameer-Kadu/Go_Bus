package com.go_bus.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.go_bus.dto.TravelerBusDTO;
import com.go_bus.pojos.BusScheduleEntity;

public interface BusScheduleService {
public BusScheduleEntity addSchedule(BusScheduleEntity busScheduleEntity);

//public List<BusScheduleEntity> findBuses(String source, String destination, LocalDate date);

public List<TravelerBusDTO> getBus(String sourceCity, String destinationCity, LocalDate departureDate);

public Optional<BusScheduleEntity> findById(Long scheduleId);

public void save(BusScheduleEntity schedule);
}
