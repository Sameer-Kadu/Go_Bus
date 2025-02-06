package com.go_bus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.go_bus.dto.OperatorDetailsDTO;
import com.go_bus.pojos.BusEntity;
import com.go_bus.pojos.UserEntity;
import com.go_bus.security.JwtUtils;
import com.go_bus.service.OperatorService;
import com.go_bus.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/operator") // URL should be lowercase for consistency
public class OperatorController {

	@Autowired
	private OperatorService operatorService;

	@Autowired
	private UserService userService;

	@Autowired
	private JwtUtils jwtUtils;

	@PostMapping("/register")
	public ResponseEntity<String> registerOperator(@RequestHeader("Authorization") String token,
			@RequestBody @Valid OperatorDetailsDTO dto) {

		System.out.println("----------------------------");
		System.out.println(dto);
		System.out.println("----------------------------");
		System.out.println(token);
		System.out.println("----------------------------");

		// 🔹 Extract JWT from "Bearer <token>"
		if (token.startsWith("Bearer ")) {
			token = token.substring(7);
		}

		// 🔹 Validate token and extract username
		Authentication authentication = jwtUtils.populateAuthenticationTokenFromJWT(token);
		if (authentication == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid JWT token");
		}

		// 🔹 Get email from Authentication object
		String userEmail = authentication.getName();

		// 🔹 Fetch the authenticated UserEntity
		UserEntity user = userService.findByEmail(userEmail);
		if (user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
		}

		// 🔹 Register the operator
		operatorService.registerOperator(dto, user);

		return ResponseEntity.status(HttpStatus.CREATED).body("Operator registered successfully!");
	}

	  @GetMapping("/getBuses")
	    public ResponseEntity<?> getBuses(@RequestHeader("Authorization") String token) {
	        // Extract token if it starts with "Bearer "
	        if (token.startsWith("Bearer ")) {
	            token = token.substring(7);
	        }
	        // Validate the token and extract authentication details
	        Authentication authentication = jwtUtils.populateAuthenticationTokenFromJWT(token);
	        if (authentication == null) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid JWT token");
	        }
	        String userEmail = authentication.getName();
	        UserEntity user = userService.findByEmail(userEmail);
	        if (user == null) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
	        }

	        // Retrieve the list of buses associated with the operator (logged-in user)
	        List<BusEntity> buses = operatorService.getBuses(user);
	        if (buses == null || buses.isEmpty()) {
	            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No buses found for this operator.");
	        }
	        return ResponseEntity.ok(buses);
	    }
	  
	  @PostMapping("/addBus")
	  public ResponseEntity<?> addBus(@RequestHeader("Authorization") String token)
	  {
		  return null;
	  }
}
