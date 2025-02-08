package com.go_bus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.go_bus.pojos.OperatorDetailsEntity;
import com.go_bus.pojos.UserEntity;

@Repository
public interface OperatorRepository extends JpaRepository<OperatorDetailsEntity, Long> {
    
    // 🔹 Check if a user is already registered as an operator
    boolean existsByUserEntity(UserEntity user);

    // 🔹 Get operator details by UserEntity
    OperatorDetailsEntity findByUserEntity(UserEntity long1);

 OperatorDetailsEntity findByAgencyName(String agencyName);
}
