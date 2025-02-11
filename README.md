# Go_Bus - Online Bus Ticket Booking System

[![Vercel](https://vercelbadge.vercel.app/api/Sameer-Kadu/Go_Bus)](https://go-bus-oarm.vercel.app/)
![Vercel](https://img.shields.io/github/deployments/Sameer-Kadu/Go_Bus/production?label=Vercel)  
![License](https://img.shields.io/github/license/Sameer-Kadu/Go_Bus)  
![Issues](https://img.shields.io/github/issues/Sameer-Kadu/Go_Bus)  
![Stars](https://img.shields.io/github/stars/Sameer-Kadu/Go_Bus?style=social)  
![Forks](https://img.shields.io/github/forks/Sameer-Kadu/Go_Bus?style=social)  






## Overview
Go_Bus is an online bus ticket booking platform designed to provide a seamless and efficient way for travelers to book bus tickets, operators to manage their buses, and administrators to oversee the entire system. The platform is built using **Spring Boot (backend)** and **React (frontend)**, with **Docker-based deployment** on an AWS **EC2 instance**.

## Features
### Traveler
- Search for available buses based on **source, destination, and date**.
- View bus details, including **seating capacity, amenities, and fares**.
- Book a seat and receive an **email confirmation**.
- Cancel bookings and view **booking history**.

### Bus Operator
- Register as an **operator** and manage buses.
- Add new buses and define **routes, schedules, and fares**.
- Monitor **seat availability** and update schedules.

### Admin
- Approve or reject **bus operators**.
- Approve **buses** added by operators.
- Manage **customer feedback and complaints**.

## Tech Stack
### Backend
- **Spring Boot** (RESTful APIs)
- **Spring Security & JWT** (Authentication)
- **MySQL** (Database)
- **Hibernate/JPA** (ORM)
- **Docker** (Containerization)
- **AWS EC2** (Hosting & Deployment)

### Frontend
- **React.js** (User Interface)
- **Tailwind CSS** (Styling)
- **Axios** (API Calls)

### DevOps & Deployment
- **Docker Compose** (Microservices Setup)
- **CI/CD Pipeline** (GitHub Actions & AWS CodeDeploy)
- **Nginx** (Reverse Proxy & SSL)
- **Duck DNS** (Custom Domain)
- **Certbot** (SSL Certificate Management)

## Installation & Setup
### Prerequisites
- **Java 17+**, **Node.js 18+**, **Docker & Docker Compose**, **MySQL 8**

### Clone the Repository
```sh
git clone https://github.com/yourusername/go_bus.git
cd go_bus
```

### Backend Setup
1. Configure database credentials in `application.properties`.
2. Build & run the Spring Boot backend:
```sh
mvn clean install
java -jar target/go_bus.jar
```

### Frontend Setup
1. Navigate to the frontend directory:
```sh
cd GoBusFrontend
```
2. Install dependencies & start the development server:
```sh
npm install
npm start
```

### Docker Deployment
```sh
docker-compose up --build -d
```

## API Endpoints (Backend)
### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Traveler
- `GET /api/buses/search` - Search for buses
- `POST /api/bookings` - Book a seat

### Operator
- `POST /api/operator/bus` - Add a new bus
- `GET /api/operator/buses` - View all buses

### Admin
- `PUT /api/admin/approve/operator/{id}` - Approve operator
- `PUT /api/admin/approve/bus/{id}` - Approve bus

## Security & Authentication
- **Spring Security & JWT** for user authentication.
- **Role-based access control** (Traveler, Operator, Admin).

## CI/CD & Deployment
- **GitHub Actions** for automated build & testing.
- **Docker-based deployment** on AWS EC2.
- **HTTPS enabled** using Certbot & Nginx.

## Contribution Guidelines
1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-branch`.
3. Commit changes & push: `git commit -m "Added new feature" && git push origin feature-branch`.
4. Open a **Pull Request**.

## License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.


## Contact
- **Developer:** Sameer Vijayrao Kadu
- **Email:** samirkadu8@gmail.com
- **LinkedIn:** [linkedin.com/in/sameerkadu](https://www.linkedin.com/in/sameer-kadu/)

---
Developed with ❤️ by Sameer Kadu

