package com.go_bus.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.go_bus.dto.OperatorDetailsDTO;
import com.go_bus.pojos.BusEntity;
import com.go_bus.pojos.OperatorDetailsEntity;
import com.go_bus.pojos.UserEntity;
import com.go_bus.repository.BusRepository;
import com.go_bus.repository.OperatorRepository;

@Service
@Transactional
public class OperatorServiceImpl implements OperatorService {

	@Autowired
	private OperatorRepository operatorRepository;
	
	@Autowired
    private BusRepository busRepository;

	@Override
	public void registerOperator(OperatorDetailsDTO dto, UserEntity user) {
		// 🔹 Check if the user is already registered as an operator
		if (operatorRepository.existsByUserEntity(user)) {
			throw new RuntimeException("User is already registered as an operator.");
		}

		// 🔹 Convert DTO to Entity
		OperatorDetailsEntity operator = new OperatorDetailsEntity();
		operator.setAgencyName(dto.getAgencyName());
		operator.setZipCode(dto.getZipCode());
		operator.setState(dto.getState());
		operator.setCity(dto.getCity());
		operator.setPhoneNumber(dto.getPhoneNumber());
		operator.setOwnerName(dto.getOwnerName());
		operator.setCountry(dto.getCountry());
		operator.setDistrict(dto.getDistrict());
		operator.setBankName(dto.getBankName());
		operator.setAccountNumber(dto.getAccountNumber());
		operator.setIfscCode(dto.getIfscCode());
		operator.setAccountType(dto.getAccountType());
		operator.setBeneficiaryName(dto.getBeneficiaryName());
		operator.setPan(dto.getPan());
		operator.setGst(dto.getGst());

		// 🔹 Link UserEntity
		operator.setUserEntity(user);

		// 🔹 Save Operator
		operatorRepository.save(operator);
	}

	@Override
	public OperatorDetailsEntity findByUserEntity(UserEntity user) {
		// TODO Auto-generated method stub
		return operatorRepository.findByUserEntity(user);
	}

	@Override
	 public List<BusEntity> getBuses(UserEntity operator) {
        // Assuming BusRepository has a method to find buses by operator
        return busRepository.findByOperator(operator);
    }

	@Override
	public List<OperatorDetailsEntity> findAll() {
		// TODO Auto-generated method stub
		return operatorRepository.findAll();
	}

	@Override
	public OperatorDetailsEntity findByAgencyName(String agencyName) {
		// TODO Auto-generated method stub
		return operatorRepository.findByAgencyName(agencyName);
	}

	@Override
	public void save(OperatorDetailsEntity operatorDetailsEntity) {
		operatorRepository.save(operatorDetailsEntity);
	}
}
