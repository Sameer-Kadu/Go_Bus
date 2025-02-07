package com.go_bus.service;

import java.util.List;

import com.go_bus.dto.OperatorDetailsDTO;
import com.go_bus.pojos.BusEntity;
import com.go_bus.pojos.OperatorDetailsEntity;
import com.go_bus.pojos.UserEntity;


public interface OperatorService {

	void registerOperator(OperatorDetailsDTO dto, UserEntity user);
	
	OperatorDetailsEntity findByUserEntity(UserEntity user);

	List<BusEntity> getBuses(UserEntity user);

	List<OperatorDetailsEntity> findAll();

	OperatorDetailsEntity findByAgencyName(String agencyName);

	void save(OperatorDetailsEntity operatorDetailsEntity);
	

}
