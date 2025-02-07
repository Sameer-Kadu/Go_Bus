package com.go_bus.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.go_bus.pojos.BusAmenitiesEntity;

public interface AmenitiesRepository extends JpaRepository<BusAmenitiesEntity, Long> {

}
