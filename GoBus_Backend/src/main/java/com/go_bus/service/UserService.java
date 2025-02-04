package com.go_bus.service;

import com.go_bus.dto.ApiResponse;
import com.go_bus.dto.UserDTO;

public interface UserService {
	ApiResponse registerNewTraveler(UserDTO dto);

	UserDTO getUser(String email);
}
