package com.go_bus.service;

import com.go_bus.dto.ApiResponse;
import com.go_bus.dto.UserDTO;
import com.go_bus.pojos.UserEntity;

public interface UserService {
	ApiResponse registerNewTraveler(UserDTO dto);

	UserDTO getUser(String email);

	UserEntity findByEmail(String userEmail);

}
