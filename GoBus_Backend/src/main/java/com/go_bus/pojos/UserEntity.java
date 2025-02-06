package com.go_bus.pojos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "User_Tb")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = { "password" })
public class UserEntity extends BaseEntity{
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private UserRole role;
	@Column(name = "name", length = 50)
	private String name;
	@Column(name = "phone_number", length = 10)
	private Long phoneNumber;
	@Column(name = "email", length = 50, unique = true)
	private String email;
	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(name = "password", length = 500)
	private String password;
	
}
