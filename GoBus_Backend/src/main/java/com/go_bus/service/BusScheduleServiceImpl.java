package com.go_bus.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.go_bus.dto.TravelerBusDTO;
import com.go_bus.pojos.BusEntity;
import com.go_bus.pojos.BusScheduleEntity;
import com.go_bus.pojos.OperatorDetailsEntity;
import com.go_bus.pojos.UserEntity;
import com.go_bus.repository.BusScheduleRepository;
import com.go_bus.repository.OperatorRepository;
@Service
@Transactional
public class BusScheduleServiceImpl implements BusScheduleService {

	@Autowired
	private BusScheduleRepository busScheduleRepository;
	
	@Autowired
	OperatorRepository operatorRepository;

	@Override
	public BusScheduleEntity addSchedule(BusScheduleEntity busScheduleEntity) {
		return busScheduleRepository.save(busScheduleEntity);

	}
	
	@Override
	public List<TravelerBusDTO> getBus(String sourceCity, String destinationCity, LocalDate departureDate) {
	    
	    List<TravelerBusDTO> searchDtoList = new ArrayList<>();

	    // Fetch bus schedules from repository
	    List<BusScheduleEntity> schedules = busScheduleRepository.findBySourceCityAndDestinationCityAndDepartureDate(sourceCity, destinationCity, departureDate);

	    // Iterate over each BusScheduleEntity and map it to TravelerBusDTO
	    schedules.forEach(schedule -> {
	        BusEntity bus = schedule.getRto(); // Fetch bus details
	        UserEntity user = bus.getOperator(); // Fetch operator details

	        // Handle missing operator case
	        OperatorDetailsEntity operatorDetailsEntity = operatorRepository.findByUserEntity(user);

	        // Eagerly load seat allocation
	        schedule.getSeatAllocationEntities().size();

	        // Map entity to DTO
	        searchDtoList.add(new TravelerBusDTO(
	            schedule.getScheduleId(),   // Schedule ID
	            schedule.getSourceCity(),   // Source City
	            schedule.getDestinationCity(), // Destination City
	            schedule.getDepartureDate(), // Departure Date
	            schedule.getArrivalDate(),   // Arrival Date
	            operatorDetailsEntity != null ? operatorDetailsEntity.getAgencyName() : "Unknown Agency", // Handle missing agency name
	            bus.isAc(),  // AC
	            bus.isSleeper(),  // Sleeper
	            bus.getBusAmenitiesId(),  // Bus Amenities
	            schedule.getBusFare(),  // Bus Fare
	            schedule.getArrivalTime(),  // Arrival Time
	            schedule.getDepartureTime(),  // Departure Time
	            schedule.getSeatAllocationEntities(),  // Seat Allocations
	            schedule.getBoardingPoint(),  // Boarding Point
	            schedule.getDestinationPoint()  // Destination Point
	        ));
	    });

	    return searchDtoList;
	}

	@Override
	public Optional<BusScheduleEntity> findById(Long scheduleId) {
		// TODO Auto-generated method stub
		return busScheduleRepository.findById(scheduleId);
	}

	@Override
	public void save(BusScheduleEntity schedule) {
		busScheduleRepository.save(schedule);
		
	}


}
