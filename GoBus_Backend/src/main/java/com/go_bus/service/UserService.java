package com.go_bus.service;

import java.util.List;

import com.go_bus.dto.ApiResponse;
import com.go_bus.dto.UserDTO;
import com.go_bus.pojos.UserEntity;
import com.go_bus.pojos.UserRole;

public interface UserService {
	ApiResponse registerNewTraveler(UserDTO dto);

	UserDTO getUser(String email);

	UserEntity findByEmail(String userEmail);

	List<UserEntity> findByRole(UserRole string);

}
