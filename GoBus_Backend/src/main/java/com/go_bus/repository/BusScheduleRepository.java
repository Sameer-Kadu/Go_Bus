package com.go_bus.repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.go_bus.pojos.BusScheduleEntity;

public interface BusScheduleRepository extends JpaRepository<BusScheduleEntity, Long> {

	List<BusScheduleEntity> findBySourceCityAndDestinationCityAndDepartureDate(String source, String destination,
			LocalDate date);

}
