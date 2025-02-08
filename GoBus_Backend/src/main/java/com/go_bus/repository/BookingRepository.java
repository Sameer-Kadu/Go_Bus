package com.go_bus.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.go_bus.pojos.BookingEntity;

public interface BookingRepository extends JpaRepository<BookingEntity, Long> {

}
