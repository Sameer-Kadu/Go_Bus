package com.go_bus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.go_bus.dto.BusDTO;
import com.go_bus.dto.OperatorDetailsDTO;
import com.go_bus.pojos.BusAmenitiesEntity;
import com.go_bus.pojos.BusEntity;
import com.go_bus.pojos.BusScheduleEntity;
import com.go_bus.pojos.OperatorDetailsEntity;
import com.go_bus.pojos.UserEntity;
import com.go_bus.security.JwtUtils;
import com.go_bus.service.AmenitiesService;
import com.go_bus.service.BusScheduleService;
import com.go_bus.service.BusService;
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
	private AmenitiesService amenitiesService;
	
	@Autowired
	private BusScheduleService busScheduleService;
	
	@Autowired
	private BusService busService;
	
	
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@PostMapping("/approve")
	public ResponseEntity<?> approveOperator(@RequestHeader("Authorization") String token, @RequestParam String agencyName)
	{
		
		System.out.println("---------------------"+agencyName+"--------------");
		OperatorDetailsEntity operatorDetailsEntity = operatorService.findByAgencyName(agencyName);
		System.out.println("------"+operatorDetailsEntity+"------------");
		operatorDetailsEntity.setApproved(true);
		System.out.println("------"+operatorDetailsEntity+"------------");
		operatorService.save(operatorDetailsEntity);
		return ResponseEntity.ok("operator approved");
	}

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

	@GetMapping("/getOperator")
	public ResponseEntity<?> getOperator (@RequestHeader("Authorization") String token)
	{
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
        
//        List<UserEntity> userEntities = userService.findByRole(UserRole.ROLE_OPERATOR);
        
        List<OperatorDetailsEntity> operatorDetailsEntities = operatorService.findAll();
        
		return ResponseEntity.ok(operatorDetailsEntities);
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
	  public ResponseEntity<?> addBus(@RequestHeader("Authorization") String token,
	          @RequestBody @Valid BusDTO busDto) {
		  
		  System.out.println("\n"+busDto+"\n");
	      // 🔹 Extract JWT token (remove "Bearer " prefix if present)
	      if (token.startsWith("Bearer ")) {
	          token = token.substring(7);
	      }
	      // 🔹 Validate token and extract authentication details
	      Authentication authentication = jwtUtils.populateAuthenticationTokenFromJWT(token);
	      if (authentication == null) {
	          return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid JWT token");
	      }
	      String userEmail = authentication.getName();
	      UserEntity user = userService.findByEmail(userEmail);
	      if (user == null) {
	          return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
	      }

	      // --- Create BusAmenitiesEntity ---
	      BusAmenitiesEntity amenitiesEntity = new BusAmenitiesEntity();
	      amenitiesEntity.setChargingPort(busDto.isChargingPoint());
	      amenitiesEntity.setComplimentaryFood(busDto.isComplementaryFood());
	      amenitiesEntity.setSheetsPillow(busDto.isSheetPelow());
	      amenitiesEntity.setToilet(busDto.isToilet());
	      amenitiesEntity.setWifi(busDto.isWifi());

	      // --- Create BusScheduleEntity ---
	      BusScheduleEntity busScheduleEntity = new BusScheduleEntity();
	      busScheduleEntity.setArrivalDate(busDto.getArrivalDate());
	      busScheduleEntity.setArrivalTime(busDto.getArrivalTime());
	      busScheduleEntity.setDepartureDate(busDto.getDepartureDate());
	      busScheduleEntity.setDepartureTime(busDto.getDepartureTime());
	      busScheduleEntity.setBoardingPoint(busDto.getBoardingPoint());
	      busScheduleEntity.setDestinationPoint(busDto.getDestinationPoint());
	      busScheduleEntity.setSourceCity(busDto.getSourceCity());
	      busScheduleEntity.setDestinationCity(busDto.getDestinationCity());
	      busScheduleEntity.setBusFare(busDto.getBusFare());
	      // Assuming that initially all seats are available.
	      busScheduleEntity.setAvailableSeats(busDto.getSeatCapacity());
	      
	      

	      // --- Create BusEntity ---
	      BusEntity busEntity = new BusEntity();
	      busEntity.setRtoRegNo(busDto.getRtoRegNo());
	      busEntity.setSeatCapacity(busDto.getSeatCapacity());
	      busEntity.setAc(busDto.isAc());
	      busEntity.setSleeper(busDto.isSleeper());
	      // Set the bus status (active/inactive) based on the provided status string
	      busEntity.setActive("Active".equalsIgnoreCase(busDto.getStatus()));
	      // Associate the operator (authenticated user)
	      busEntity.setOperator(user);

	      // Save amenities first and set it in the bus
	      BusAmenitiesEntity amenitiesEntity2 = amenitiesService.addAminities(amenitiesEntity);
	      busEntity.setBusAmenitiesId(amenitiesEntity2);

	      // Save the bus entity
	      BusEntity busEntity2 = busService.addBus(busEntity);

	      // Set the saved bus in the schedule and then save the schedule
	      busScheduleEntity.setRto(busEntity2);
	      busScheduleEntity.initializeSeat();
	      BusScheduleEntity busScheduleEntity2 = busScheduleService.addSchedule(busScheduleEntity);

	      // Return the created schedule or another appropriate response
	      return ResponseEntity.status(HttpStatus.CREATED).body(busScheduleEntity2);
	  }
	  
	  
}
