package com.go_bus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.go_bus.pojos.BusEntity;
import com.go_bus.pojos.UserEntity;

public interface BusRepository extends JpaRepository<BusEntity, String> {

	List<BusEntity> findByOperator(UserEntity operator);

}
