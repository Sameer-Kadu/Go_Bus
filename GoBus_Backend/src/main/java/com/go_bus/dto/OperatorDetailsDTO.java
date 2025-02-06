package com.go_bus.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OperatorDetailsDTO {

    @NotBlank(message = "Agency name cannot be blank")
    private String agencyName;

    @NotNull(message = "Zip code is required")
   
    private Long zipCode;

    @NotBlank(message = "State cannot be blank")
    private String state;

    @NotBlank(message = "City cannot be blank")
    private String city;

    @NotBlank(message = "Phone number is required")
   
    private String phoneNumber;

    @NotBlank(message = "Owner name cannot be blank")
    private String ownerName;

    @NotBlank(message = "Country cannot be blank")
    private String country;

    @NotBlank(message = "District cannot be blank")
    private String district;

    @NotBlank(message = "Bank name cannot be blank")
    private String bankName;

    @NotBlank(message = "Account number is required")
   
    private String accountNumber;

    @NotBlank(message = "IFSC code is required")
   
    private String ifscCode;

    @NotBlank(message = "Account type is required")
   
    private String accountType;

    @NotBlank(message = "Beneficiary name cannot be blank")
    private String beneficiaryName;

    @NotBlank(message = "PAN is required")
   
    private String pan;

    @NotBlank(message = "GST is required")
  
    private String gst;

//    @NotBlank(message = "User email is required")
//    @Email(message = "Invalid email format")
//    private String userEmail;
}
