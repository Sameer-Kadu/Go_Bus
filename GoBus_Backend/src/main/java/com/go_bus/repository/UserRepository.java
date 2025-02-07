package com.go_bus.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.go_bus.pojos.UserEntity;
import com.go_bus.pojos.UserRole;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findByEmail(String email);

	  boolean existsByEmail(String email);

	List<UserEntity> findByRole(UserRole string);
}
