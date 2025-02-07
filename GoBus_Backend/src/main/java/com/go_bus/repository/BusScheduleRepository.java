package com.go_bus.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.go_bus.pojos.BusScheduleEntity;

public interface BusScheduleRepository extends JpaRepository<BusScheduleEntity, Long> {

}
