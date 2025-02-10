package com.go_bus.config;

import com.go_bus.dto.UserDTO;
import com.go_bus.pojos.UserRole;
import com.go_bus.repository.UserRepository;
import com.go_bus.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Bean
    public CommandLineRunner initAdmin(UserRepository userRepository, UserService userService, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("Admin@gmail.com").isEmpty()) {
                // Create an admin DTO
                UserDTO adminDTO = new UserDTO();
                adminDTO.setRole(UserRole.ROLE_ADMIN); // Assuming you have this role in UserRole enum
                adminDTO.setName("Admin");
                adminDTO.setPhoneNumber(1234567890L);
                adminDTO.setEmail("Admin@gmail.com");
                adminDTO.setPassword("Admin"); // You may encode it inside the service

                // Register the admin using the existing service method
                userService.registerNewTraveler(adminDTO);
                
                System.out.println("Admin user created successfully!");
            } else {
                System.out.println("Admin user already exists.");
            }
        };
    }
}
