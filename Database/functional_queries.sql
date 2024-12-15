---Registration---

    --- POP-UP---
        -- Traveler
        -- Operator
    -------------

---If_Traveler---

    ---Traveler Registration---
    INSERT INTO User_tb (User_Name, User_Email, User_Password, User_PhoneNumber, Is_Traveller) VALUES (?, ?, ?, ?, ?);

---If_Operator---

    ---Operator Registration---
    INSERT INTO Operator_tb (Operator_Name, Operator_Email, Operator_Number, Operator_Password, Is_Operator) VALUES (?, ?, ?, ?, ?, ?);

        --- Operator's Personal Details --- (Operator_Id bring from registration page)
        INSERT INTO Operator_Personal_Details_tb (Operator_Id, Travels_Name, Operator_Pan, Operator_Pincode, Operator_Country, Operator_State, Operator_District, Operator_City) VALUES (?, ?, ?, ?, ?, ?, ?, ?);

        --- Operator's Bank Details --- (Operator_Id bring from registration page)
        INSERT INTO Operator_Bank_Details_tb (Operator_Id, Operator_Bank_Name,Operator_Bank_Account_Number, Operator_Bank_Account__IFSC, Operator_Bank_Account_Type, Operator_Beneficiary_Name, Operator_Has_GSTNO, Operator_GSTNO) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        
    ---Registration complete---

    ---Operator Verification---
        ---Document Verification---
        INSERT INTO Operator_Requests_tb (Operator_Id, Registration_Date, Approval_Status, Approved_Date) VALUES (?, NOW(), 'pending', NULL);

        ---approval---
        UPDATE Operator_Requests_tb
        SET Approval_Status = 'approved', Approved_Date = NOW()
        WHERE Operator_Id = ?;    

---logIn---

    --user logIn--
    SELECT * FROM User_tb WHERE User_Email = ? AND User_Password = ?;

    --Operator logIn--
    SELECT * FROM Operator_tb WHERE Operator_Email = ? AND Operator_Password = ?;