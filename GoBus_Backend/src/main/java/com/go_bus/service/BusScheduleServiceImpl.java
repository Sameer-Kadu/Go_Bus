package com.go_bus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.go_bus.pojos.BusScheduleEntity;
import com.go_bus.repository.BusScheduleRepository;
@Service
@Transactional
public class BusScheduleServiceImpl implements BusScheduleService {

	@Autowired
	private BusScheduleRepository busScheduleRepository;

	@Override
	public BusScheduleEntity addSchedule(BusScheduleEntity busScheduleEntity) {
		return busScheduleRepository.save(busScheduleEntity);

	}

}
