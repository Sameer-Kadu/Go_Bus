package com.go_bus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.go_bus.pojos.BusAmenitiesEntity;
import com.go_bus.repository.AmenitiesRepository;
@Service
@Transactional
public class AmenitiesServiceImpl implements AmenitiesService {

	@Autowired
	private AmenitiesRepository amenitiesRepository;

	@Override
	public BusAmenitiesEntity addAminities(BusAmenitiesEntity amenitiesEntity) {
		// TODO Auto-generated method stub
		return amenitiesRepository.save(amenitiesEntity);
	}

}
