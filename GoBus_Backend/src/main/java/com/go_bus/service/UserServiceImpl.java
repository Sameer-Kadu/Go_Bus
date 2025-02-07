package com.go_bus.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.go_bus.custom_exceptions.ApiException;
import com.go_bus.dto.ApiResponse;
import com.go_bus.dto.UserDTO;
import com.go_bus.pojos.UserEntity;
import com.go_bus.pojos.UserRole;
import com.go_bus.repository.UserRepository;
@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public ApiResponse registerNewTraveler(UserDTO dto) {
		if (userRepository.existsByEmail(dto.getEmail()))
			throw new ApiException("Traveler email already exists!!");
		UserEntity travelerEntity = modelMapper.map(dto, UserEntity.class);
		travelerEntity.setPassword(passwordEncoder.encode(travelerEntity.getPassword()));
		UserEntity saveTraveler = userRepository.save(travelerEntity);
		return new ApiResponse("User register with ID" + saveTraveler.getId());
	}

	@Override
	public UserDTO getUser(String email) {
	    System.out.println("Searching for user with email: " + email);
	    Optional<UserEntity> userEntity = userRepository.findByEmail(email);

	    if (userEntity.isEmpty()) {
	        System.out.println("User not found in database.");
	        throw new ApiException("User not found with email: " + email);
	    }
 
	    System.out.println("User found: " + userEntity.get());
	    return modelMapper.map(userEntity.get(), UserDTO.class);
	}

	@Override
	public UserEntity findByEmail(String userEmail) {
		  System.out.println("Searching for user with email: " + userEmail);
		    Optional<UserEntity> userEntity = userRepository.findByEmail(userEmail);

		    if (userEntity.isEmpty()) {
		        System.out.println("User not found in database.");
		        throw new ApiException("User not found with email: " + userEmail);
		    }
	 
		    System.out.println("User found: " + userEntity.get());
		    return modelMapper.map(userEntity.get(), UserEntity.class);
	}

	@Override
	public List<UserEntity> findByRole(UserRole string) {
		// TODO Auto-generated method stub
		return userRepository.findByRole(string);
	}

	

}
