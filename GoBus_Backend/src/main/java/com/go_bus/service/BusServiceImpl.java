package com.go_bus.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.go_bus.dto.TravelerBusDTO;
import com.go_bus.pojos.BusEntity;
import com.go_bus.pojos.BusScheduleEntity;
import com.go_bus.pojos.OperatorDetailsEntity;
import com.go_bus.pojos.SeatAllocationEntity;
import com.go_bus.pojos.UserEntity;
import com.go_bus.repository.BusRepository;
import com.go_bus.repository.BusScheduleRepository;
import com.go_bus.repository.OperatorRepository;

@Service
@Transactional
public class BusServiceImpl implements BusService {

	@Autowired
	private BusRepository busRepository;

	@Autowired
	private BusScheduleRepository busScheduleRepository;
	
	@Autowired
	private OperatorRepository operatorRepository;

	@Override
	public BusEntity addBus(BusEntity busEntity) {

		return busRepository.save(busEntity);
	}

	@Override
	public List<SeatAllocationEntity> getSeatAllocationList(Long id) {
		// TODO Auto-generated method stub
		return null;
	}




}
