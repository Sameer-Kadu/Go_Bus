package com.go_bus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.go_bus.dto.AuthRequest;
import com.go_bus.dto.AuthResp;
import com.go_bus.dto.UserDTO;
import com.go_bus.pojos.OperatorDetailsEntity;
import com.go_bus.pojos.UserEntity;
import com.go_bus.pojos.UserRole;
import com.go_bus.security.JwtUtils;
import com.go_bus.service.OperatorService;
import com.go_bus.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

//traveler controller to manage the registration login and authorization of the traveler;
//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/User")
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private OperatorService operatorService;
	
	@Autowired
	private JwtUtils jwtUtils;

	@PostMapping("/signup")
	@Operation(description = "Traveler signup")
	public ResponseEntity<?> registerTraveler(@RequestBody @Valid UserDTO dto) {
		System.out.println("-----------------------------------------------");
		System.out.println("-----------------------------------------------");
		System.out.println("registre user:- " + dto);
		System.out.println("-----------------------------------------------");
		System.out.println("-----------------------------------------------");

		return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerNewTraveler(dto));
	}

	@PostMapping("signin")
	@Operation(description = "Traveler singin")
	public ResponseEntity<?> travelerSignIn(@RequestBody @Valid AuthRequest dto) {
		System.out.println("-----------------------------------------------");
		System.out.println("-----------------------------------------------");
		System.out.println("in sing in:- " + dto);
		System.out.println("-----------------------------------------------");
		System.out.println("-----------------------------------------------");

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				dto.getEmail(), dto.getPassword());
		System.out.println("-----------------------------------------------");
		System.out.println("-----------------------------------------------");
		System.out.println("first isAuthenticated:- " + authenticationToken.isAuthenticated());
		System.out.println("-----------------------------------------------");
		System.out.println("-----------------------------------------------");

		Authentication authToken = authenticationManager.authenticate(authenticationToken);
		System.out.println("-----------------------------------------------");
		System.out.println("-----------------------------------------------");
		System.out.println(authToken);
		System.out.println("second isAuthenticated:- " + authToken.isAuthenticated());
		System.out.println("-----------------------------------------------");
		System.out.println("-----------------------------------------------");

		UserRole userRole = authToken.getAuthorities().stream().findFirst() // Get the first role (if multiple roles
																			// exist)
				.map(grantedAuthority -> UserRole.valueOf(grantedAuthority.getAuthority())) // Convert String to Enum
				.orElse(UserRole.ROLE_TRAVELER);

		UserDTO userDTO = userService.getUser(dto.getEmail());
		System.out.println("-----------------------------------------------");
		System.out.println("-----------------------------------------------");
		System.out.println(userDTO);
		System.out.println("-----------------------------------------------");
		System.out.println("-----------------------------------------------");

		UserEntity userEntity = userService.findByEmail(userDTO.getEmail());
		
		OperatorDetailsEntity operatorDetailsEntity = operatorService.findByUserEntity(userEntity);
		
		
		return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResp("Sucessful Auth !",
				jwtUtils.generateJwtToken(authToken), userRole, userDTO.getName(), userDTO.getEmail(),operatorDetailsEntity));
	}

}
