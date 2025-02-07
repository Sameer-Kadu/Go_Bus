package com.go_bus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.go_bus.pojos.BusEntity;
import com.go_bus.repository.BusRepository;
@Service
@Transactional
public class BusServiceImpl implements BusService {
	
	@Autowired
	private BusRepository busRepository;

	@Override
	public BusEntity addBus(BusEntity busEntity) {
		
		return busRepository.save(busEntity);
	}

}
