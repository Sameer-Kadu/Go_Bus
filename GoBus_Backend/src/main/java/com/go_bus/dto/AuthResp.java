package com.go_bus.dto;

import com.go_bus.pojos.OperatorDetailsEntity;
import com.go_bus.pojos.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthResp {
	private String message;
	private String jwt;
	private UserRole role;
	private String name;
	private String email;
	private OperatorDetailsEntity operatorDetailsEntity;
}
