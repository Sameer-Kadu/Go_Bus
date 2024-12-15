-- create database
CREATE DATABASE GoBus_db;

-- use database
USE GoBus_db;

-- Admin Table
CREATE TABLE Admin_tb (
    Admin_Id INT AUTO_INCREMENT PRIMARY KEY,
    Admin_Name VARCHAR(255),
    Admin_Email VARCHAR(255) UNIQUE,
    Admin_Password VARCHAR(255),
    Role ENUM('Admin', 'SuperAdmin') DEFAULT 'Admin'
);

-- User Table
CREATE TABLE User_tb (
    User_Id INT AUTO_INCREMENT PRIMARY KEY,
    User_Name VARCHAR(255),
    User_Email VARCHAR(255) UNIQUE,
    User_Password VARCHAR(255),
    User_PhoneNumber VARCHAR(15),
    User_Gender ENUM('Male', 'Female', 'Other'),
    User_DOB DATE,
    Is_Traveller BOOLEAN DEFAULT TRUE

);

-- Operator Table
CREATE TABLE Operator_tb (
    Operator_Id INT AUTO_INCREMENT PRIMARY KEY,
    Operator_Name VARCHAR(255),
    Operator_Email VARCHAR(255) UNIQUE,
    Operator_Number VARCHAR(15),
    Operator_Password VARCHAR(255),
    Is_Operator BOOLEAN DEFAULT TRUE
);

-- Operator Personal Details Table
CREATE TABLE Operator_Personal_Details_tb (
    Operator_Id INT PRIMARY KEY,
    Travels_Name VARCHAR(255),
    Operator_Pan VARCHAR(50),
    Operator_Pincode VARCHAR(10),
    Operator_Country VARCHAR(100),
    Operator_State VARCHAR(100),
    Operator_District VARCHAR(100),
    Operator_City VARCHAR(100),
    Operator_Gender ENUM('Male', 'Female', 'Other'),
    Operator_DOB DATE
    FOREIGN KEY (Operator_Id) REFERENCES Operator_tb(Operator_Id)
);

-- Operator Bank Details Table
CREATE TABLE Operator_Bank_Details_tb (
    Operator_Id INT PRIMARY KEY,
    Operator_Bank_Name VARCHAR(255),
    Operator_Bank_Account_Number VARCHAR(20),
    Operator_Bank_Account_IFSC VARCHAR(20),
    Operator_Bank_Account_Type ENUM('Savings', 'Current'),
    Operator_Beneficiary_Name VARCHAR(255),
    Operator_Has_GSTNO BOOLEAN DEFAULT FALSE,
    Operator_GSTNO VARCHAR(15),
    FOREIGN KEY (Operator_Id) REFERENCES Operator_tb(Operator_Id)
);

-- Operator Requests Table
CREATE TABLE Operator_Requests_tb (
    Request_Id INT AUTO_INCREMENT PRIMARY KEY,
    Operator_Id INT,
    Request_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    Approved_Date TIMESTAMP NULL,
    Verified_By INT,
    Verification_Comments TEXT,
    FOREIGN KEY (Operator_Id) REFERENCES Operator_tb(Operator_Id)
);

-- Passenger Table
CREATE TABLE Passenger_tb (
    Passenger_Id INT AUTO_INCREMENT PRIMARY KEY,
    Passenger_Name VARCHAR(255),
    Passenger_Gender ENUM('Male', 'Female', 'Other'),
    User_Id INT,
    FOREIGN KEY (User_Id) REFERENCES User_tb(User_Id)
);

-- City Table
CREATE TABLE City_tb (
    City_Id INT AUTO_INCREMENT PRIMARY KEY,
    City_Name VARCHAR(255)
);

-- Inter-City Table
CREATE TABLE Inter_City_tb (
    Inter_City_Id INT AUTO_INCREMENT PRIMARY KEY,
    City_Id INT,
    Inter_City_Name VARCHAR(255),
    FOREIGN KEY (City_Id) REFERENCES City_tb(City_Id)
);

-- Routes Table
CREATE TABLE Routes_tb (
    Route_Id INT AUTO_INCREMENT PRIMARY KEY,
    Start_Location VARCHAR(255),
    End_Location VARCHAR(255),
    Distance DECIMAL(10, 2)
);

-- Bus Table
CREATE TABLE Bus_tb (
    Bus_Id INT AUTO_INCREMENT PRIMARY KEY,
    Bus_Number VARCHAR(255),
    Bus_Capacity INT,
    Bus_Operator_Id INT,
    Is_Sleeper BOOLEAN DEFAULT FALSE,
    Is_AC BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Bus_Operator_Id) REFERENCES Operator_tb(Operator_Id)
);

-- Bus Amenities Table
CREATE TABLE Bus_Amenities_tb (
    Bus_Amenities_Id INT AUTO_INCREMENT PRIMARY KEY,
    Have_Charging_Point BOOLEAN DEFAULT FALSE,
    Have_Sheet_Pillow_Blanket BOOLEAN DEFAULT FALSE,
    Have_Wifi BOOLEAN DEFAULT FALSE,
    Bus_Id INT,
    FOREIGN KEY (Bus_Id) REFERENCES Bus_tb(Bus_Id)
);

-- Bus Seat Details Table
CREATE TABLE Bus_Seat_Details_tb (
    Seat_Id INT AUTO_INCREMENT PRIMARY KEY,
    Bus_Id INT,
    Seat_No INT,
    Gender_Allocation ENUM('Male', 'Female', 'Unspecified') DEFAULT 'Unspecified',
    Is_Booked BOOLEAN DEFAULT FALSE,
    Passenger_Id INT NULL,
    FOREIGN KEY (Bus_Id) REFERENCES Bus_tb(Bus_Id),
    FOREIGN KEY (Passenger_Id) REFERENCES Passenger_tb(Passenger_Id)
);

-- Schedules Table
CREATE TABLE Schedules_tb (
    Schedule_Id INT AUTO_INCREMENT PRIMARY KEY,
    Bus_Id INT,
    Route_Id INT,
    Departure_Time DATETIME,
    Arrival_Time DATETIME,
    Fare DECIMAL(10, 2),
    FOREIGN KEY (Bus_Id) REFERENCES Bus_tb(Bus_Id),
    FOREIGN KEY (Route_Id) REFERENCES Routes_tb(Route_Id)
);

-- Bookings Table
CREATE TABLE Bookings_tb (
    Booking_Id INT AUTO_INCREMENT PRIMARY KEY,
    User_Id INT,
    Schedule_Id INT,
    Booking_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Seat_Number INT,
    Booking_Status ENUM('Pending', 'Confirmed', 'Cancelled') DEFAULT 'Pending',
    Passenger_Id INT,
    FOREIGN KEY (User_Id) REFERENCES User_tb(User_Id),
    FOREIGN KEY (Schedule_Id) REFERENCES Schedules_tb(Schedule_Id),
    FOREIGN KEY (Passenger_Id) REFERENCES Passenger_tb(Passenger_Id)
);

-- Payment Table
CREATE TABLE Payment_tb (
    Payment_Id INT AUTO_INCREMENT PRIMARY KEY,
    Booking_Id INT,
    Payment_Amount DECIMAL(10, 2),
    Payment_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Payment_Status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
    Payment_Transaction_Id VARCHAR(255),
    FOREIGN KEY (Booking_Id) REFERENCES Bookings_tb(Booking_Id)
);


CREATE TABLE Reviews_Ratings_tb (
    Review_Id INT PRIMARY KEY AUTO_INCREMENT,
    User_Id INT,
    Bus_Id INT,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Review TEXT,
    Review_Date TIMESTAMP,
    FOREIGN KEY (User_Id) REFERENCES User_tb(User_Id),
    FOREIGN KEY (Bus_Id) REFERENCES Bus_tb(Bus_Id)
);



--future scopes----
--1. luggage details of passenger
