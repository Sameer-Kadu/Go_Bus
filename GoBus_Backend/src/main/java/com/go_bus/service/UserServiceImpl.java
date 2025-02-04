package com.go_bus.service;

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
	Optional<UserEntity> userEntity = userRepository.findByEmail(email);
	UserDTO userDTO = modelMapper.map(userEntity, UserDTO.class);
		return userDTO;
	}

}
