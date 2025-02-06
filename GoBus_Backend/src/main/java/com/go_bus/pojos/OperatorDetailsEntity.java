package com.go_bus.pojos;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Operator_Details_Tb")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class OperatorDetailsEntity extends BaseEntity {

  

    @Column(name = "Agency_Name", nullable = false)
    private String agencyName;

    @Column(name = "Zip_Code", nullable = false)
    private Long zipCode;

    @Column(name = "State", nullable = false)
    private String state;

    @Column(name = "City", nullable = false)
    private String city;

    @Column(name = "Phone_Number", nullable = false, unique = true)
    private String phoneNumber;

    @Column(name = "Owner_Name", nullable = false)
    private String ownerName;

    @Column(name = "Country", nullable = false)
    private String country;

    @Column(name = "District", nullable = false)
    private String district;

    @Column(name = "Bank_Name", nullable = false)
    private String bankName;

    @Column(name = "Account_Number", nullable = false, unique = true)
    private String accountNumber;

    @Column(name = "IFSC_Code", nullable = false)
    private String ifscCode;

    @Column(name = "Account_Type", nullable = false)
    private String accountType;

    @Column(name = "Beneficiary_Name", nullable = false)
    private String BeneficiaryName;
  

    @Column(name = "PAN", nullable = false, unique = true)
    private String pan;

    @Column(name = "GST", nullable = false, unique = true)
    private String gst;
    
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, unique = true)
    private UserEntity userEntity;
    
    @Column(name = "is_approved", nullable = false)
    private boolean isApproved = false; // Default value is false
    
}
