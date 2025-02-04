package com.go_bus.dto;

import com.go_bus.pojos.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
	@NotNull
	private UserRole role;
	@NotBlank
	private String name;
	@NotNull
	private Long phoneNumber;
	@NotBlank
	@Email
	private String email;
	@NotBlank
	private String password;
}
