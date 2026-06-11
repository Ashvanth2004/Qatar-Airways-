# Qatar Airways Backend — Architecture Blueprint

## 1. Project Overview

- **Framework:** Spring Boot 3.2.5
- **Language:** Java 17
- **Build Tool:** Maven
- **Port:** 5000
- **Default Database:** MySQL 8+ (PostgreSQL optional)
- **Artifact:** `qatar-airways-backend-1.0.0`

---

## 2. Project Structure

```
qatar-airways-backend/
├── pom.xml                                  # Maven build configuration
├── BLUEPRINT.md                             # This document
└── src/
    └── main/
        ├── java/com/qatarairways/
        │   ├── QatarAirwaysApplication.java # Entry point
        │   ├── config/
        │   │   ├── CorsConfig.java          # CORS global configuration
        │   │   └── DataInitializer.java     # Seed data loader (CommandLineRunner)
        │   ├── model/
        │   │   ├── User.java                # User entity
        │   │   ├── Flight.java              # Flight entity
        │   │   └── Booking.java             # Booking entity
        │   ├── dto/
        │   │   ├── LoginRequest.java        # Login request DTO
        │   │   └── RegisterRequest.java     # Register request DTO
        │   ├── repository/
        │   │   ├── UserRepository.java      # User data access
        │   │   ├── FlightRepository.java    # Flight data access
        │   │   └── BookingRepository.java   # Booking data access
        │   ├── service/
        │   │   ├── AuthService.java         # Authentication business logic
        │   │   ├── FlightService.java       # Flight search & management
        │   │   └── BookingService.java      # Booking business logic
        │   └── controller/
        │       ├── AuthController.java      # /api/auth endpoints
        │       ├── FlightController.java    # /api/flights endpoints
        │       └── BookingController.java   # /api/bookings endpoints
        └── resources/
            └── application.properties       # Configuration
```

---

## 3. Technology Stack

| Layer          | Technology                               |
|----------------|------------------------------------------|
| Framework      | Spring Boot 3.2.5                        |
| Language       | Java 17                                  |
| ORM            | Spring Data JPA / Hibernate 6            |
| Database (dev) | MySQL 8+ (mysql-connector-j)             |
| Database (alt) | PostgreSQL 15+ (postgresql driver)       |
| Validation     | Jakarta Validation (Hibernate Validator) |
| Build          | Maven                                    |
| Ser/Deser      | Jackson (auto-configured via Spring)     |

---

## 4. Data Models (Entities)

### 4.1 `User` — Table: `users`

| Field          | Type            | Constraints             |
|----------------|-----------------|-------------------------|
| id             | Long (PK)       | AUTO_INCREMENT          |
| email          | String          | NOT NULL, UNIQUE        |
| password       | String          | NOT NULL                |
| fullName       | String          | NOT NULL                |
| phone          | String          | nullable                |
| aviosBalance   | Integer         | default = 0             |
| loyaltyTier    | String          | default = "silver"      |
| createdAt      | LocalDateTime   | default = NOW()         |

**Relationships:**
- One-to-Many with `Booking`

### 4.2 `Flight` — Table: `flights`

| Field           | Type            | Constraints             |
|-----------------|-----------------|-------------------------|
| id              | Long (PK)       | AUTO_INCREMENT          |
| flightNumber    | String          | NOT NULL                |
| origin          | String (3)      | NOT NULL (IATA code)    |
| destination     | String (3)      | NOT NULL (IATA code)    |
| departureTime   | LocalDateTime   | NOT NULL                |
| arrivalTime     | LocalDateTime   | NOT NULL                |
| cabinClass      | String          | nullable (Economy/Business) |
| price           | BigDecimal(10,2)| nullable                |
| currency        | String          | default = "USD"         |
| availableSeats  | Integer         | nullable                |
| createdAt       | LocalDateTime   | default = NOW()         |

**Relationships:**
- One-to-Many with `Booking`

### 4.3 `Booking` — Table: `bookings`

| Field            | Type            | Constraints                   |
|------------------|-----------------|-------------------------------|
| id               | Long (PK)       | AUTO_INCREMENT                |
| user             | User (FK)       | @ManyToOne, NOT NULL          |
| flight           | Flight (FK)     | @ManyToOne (EAGER), NOT NULL  |
| bookingReference | String (8)      | UNIQUE, auto-generated (UUID) |
| status           | String          | default = "pending"           |
| totalPrice       | BigDecimal(10,2)| nullable                      |
| currency         | String          | default = "USD"               |
| passengerCount   | Integer         | default = 1                   |
| passengers       | TEXT            | nullable (JSON string)        |
| createdAt        | LocalDateTime   | default = NOW()               |

**Relationships:**
- Many-to-One with `User`
- Many-to-One with `Flight`

---

## 5. Layer Architecture

### 5.1 Controller Layer (REST API)

All controllers use `@RestController` + `@CrossOrigin` with CORS origins from config.

| Controller         | Base Path         | Endpoints                                                          |
|--------------------|-------------------|--------------------------------------------------------------------|
| `AuthController`   | `/api/auth`       | `POST /register`, `POST /login`, `GET /user/{email}`              |
| `FlightController` | `/api/flights`    | `GET /search`, `GET /`, `GET /{id}`, `GET /destinations`, `POST /` |
| `BookingController`| `/api/bookings`   | `POST /`, `GET /`, `GET /{reference}`, `DELETE /{id}`             |

### 5.2 Service Layer (Business Logic)

| Service           | Key Methods                                                      |
|-------------------|------------------------------------------------------------------|
| `AuthService`     | `register(fullName, email, password)`, `login(email, password)`, `findByEmail(email)` |
| `FlightService`   | `searchFlights(...)`, `getFlightById(id)`, `getDestinations()`, `addFlight(flight)`, `getAllFlights()` |
| `BookingService`  | `createBooking(user, flightId, passengers)`, `getUserBookings(userId)`, `getBookingByReference(ref)`, `cancelBooking(bookingId, userId)`, `getBookingById(id)` |

### 5.3 Repository Layer (Data Access)

| Repository         | Custom Queries                                                                    |
|--------------------|-----------------------------------------------------------------------------------|
| `UserRepository`   | `findByEmail(email)`, `existsByEmail(email)`                                      |
| `FlightRepository` | `findByOriginAndDestinationAndDepartureTimeBetween(...)`, `searchFlights(...)` (JPQL), `findAllDestinations()` (JPQL) |
| `BookingRepository`| `findByUserIdOrderByCreatedAtDesc(userId)`, `findByBookingReference(ref)`, `findByIdAndUserId(id, userId)` |

### 5.4 DTO Layer (Request Validation)

| DTO                | Fields                          | Validations                                      |
|--------------------|---------------------------------|--------------------------------------------------|
| `LoginRequest`     | email, password                 | `@Email`, `@NotBlank` on both                    |
| `RegisterRequest`  | fullName, email, password       | `@NotBlank` on fullName, `@Email`+`@NotBlank` on email, `@Size(min=6)` on password |

---

## 6. API Endpoints — Complete Reference

### 6.1 Authentication (`/api/auth`)

#### `POST /api/auth/register`
- **Body:** `{ "fullName": "...", "email": "...", "password": "..." }`
- **Success (200):** `{ "success": true, "data": { id, email, fullName, aviosBalance, loyaltyTier } }`
- **Error (400):** `{ "success": false, "message": "Email already registered: ..." }`

#### `POST /api/auth/login`
- **Body:** `{ "email": "...", "password": "..." }`
- **Success (200):** `{ "success": true, "data": { id, email, fullName, aviosBalance, loyaltyTier } }`
- **Error (400):** `{ "success": false, "message": "..." }`

#### `GET /api/auth/user/{email}`
- **Success (200):** `{ "success": true, "data": { ...user } }`
- **Error (404):** 404 Not Found

### 6.2 Flights (`/api/flights`)

#### `GET /api/flights/search`
- **Params:** `origin`, `destination`, `date` (ISO), `passengers` (default=1), `cabinClass` (default="Economy")
- **Success (200):** `{ "success": true, "data": [...flights], "meta": { "count": N } }`

#### `GET /api/flights`
- **Success (200):** `{ "success": true, "data": [...allFlights] }`

#### `GET /api/flights/{id}`
- **Success (200):** `{ "success": true, "data": { ...flight } }`
- **Error (404):** 404 Not Found

#### `GET /api/flights/destinations`
- **Success (200):** `{ "success": true, "data": ["DOH", "LHR", ...] }`

#### `POST /api/flights`
- **Body:** Flight JSON
- **Success (200):** `{ "success": true, "data": { ...savedFlight } }`

### 6.3 Bookings (`/api/bookings`)

#### `POST /api/bookings`
- **Body:** `{ "email": "...", "flightId": 1, "passengers": 2 }`
- **Success (200):** `{ "success": true, "data": { id, bookingReference, status, totalPrice, passengerCount, flight, createdAt } }`
- **Error (400):** `{ "success": false, "message": "..." }`

#### `GET /api/bookings`
- **Params:** `email`
- **Success (200):** `{ "success": true, "data": [...bookings] }`

#### `GET /api/bookings/{reference}`
- **Success (200):** `{ "success": true, "data": { ...booking } }`
- **Error (404):** 404 Not Found

#### `DELETE /api/bookings/{id}?email=...`
- **Success (200):** `{ "success": true, "data": { id, status: "cancelled" } }`
- **Error (400):** `{ "success": false, "message": "..." }`

---

## 7. Security & Configuration

### 7.1 CORS Configuration (`CorsConfig.java`)
- Allows all origins (`*` pattern)
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Headers: All
- Credentials: Allowed
- Applied globally to all paths

### 7.2 Application Properties (`application.properties`)
- Server runs on port 5000
- JPA `ddl-auto=update` (auto-creates tables from entities)
- SQL logging enabled (`show-sql=true`)
- MySQL dialect configured by default
- PostgreSQL configuration available (commented out)
- CORS origins whitelist includes common dev ports (3000, 5173-5175)

### 7.3 Authentication Note
- **No JWT / token-based auth** implemented yet
- Passwords stored in **plaintext** (no hashing/encoding)
- Sessions are stateless — user identity passed via `email` field in booking requests

---

## 8. Seed Data (`DataInitializer.java`)

On first startup, the system loads **15 sample flights** across these routes:

| Flight | Route          | Cabin     | Price  |
|--------|----------------|-----------|--------|
| QR001  | DOH → LHR      | Economy   | $450   |
| QR002  | DOH → LHR      | Business  | $1,200 |
| QR003  | DOH → JFK      | Economy   | $550   |
| QR004  | DOH → JFK      | Business  | $1,500 |
| QR005  | LHR → DOH      | Economy   | $420   |
| QR006  | LHR → JFK      | Economy   | $380   |
| QR007  | JFK → DOH      | Economy   | $530   |
| QR008  | JFK → LHR      | Economy   | $400   |
| QR009  | DOH → CDG      | Economy   | $480   |
| QR010  | DOH → CDG      | Business  | $1,300 |
| QR011  | DOH → DXB      | Economy   | $150   |
| QR012  | DOH → SYD      | Economy   | $800   |
| QR013  | DOH → SIN      | Economy   | $350   |
| QR014  | DOH → KUL      | Economy   | $300   |
| QR015  | DOH → IST      | Economy   | $280   |

---

## 9. Business Logic Highlights

### 9.1 Booking Creation Flow
1. Validate user exists by email → `AuthService.findByEmail(email)`
2. Fetch flight by ID → validate availability
3. Create `Booking` entity → auto-generate booking reference (8-char UUID)
4. Set total price = `flight.price × passengerCount`
5. Decrement `flight.availableSeats`
6. Return booking details

### 9.2 Cancellation Flow
1. Find booking by `id` AND `userId` (ownership check)
2. Verify booking is not already cancelled
3. Set status = `"cancelled"`
4. Restore `flight.availableSeats += passengerCount`
5. Return updated booking

### 9.3 Flight Search
- Custom JPQL query filters by: `origin`, `destination`, `date`, `cabinClass`, `availableSeats >= passengers`
- Date comparison uses `DATE()` MySQL function on `departureTime`

---

## 10. Dependencies (pom.xml)

| Dependency                          | Purpose                        |
|-------------------------------------|--------------------------------|
| `spring-boot-starter-web`           | REST API (Tomcat, Jackson)     |
| `spring-boot-starter-data-jpa`      | JPA + Hibernate ORM            |
| `spring-boot-starter-validation`    | Bean Validation (Jakarta)      |
| `spring-boot-starter-data-jdbc`     | JDBC support                   |
| `mysql-connector-j` (runtime)       | MySQL driver                   |
| `postgresql` (runtime)              | PostgreSQL driver (optional)   |
| `lombok` (optional)                 | Boilerplate reduction          |
| `spring-boot-maven-plugin`          | Build & package                |

---

## 11. Running the Backend

```bash
# Prerequisites: Java 17+, MySQL running on localhost:3306

# Create database
mysql -u root -p -e "CREATE DATABASE qatar_airways;"

# Build and run
cd qatar-airways-backend
mvn clean package
mvn spring-boot:run

# Or run the JAR directly
java -jar target/qatar-airways-backend-1.0.0.jar
```

---

## 12. Known Limitations / Future Improvements

| Area               | Current State                          | Suggested Improvement                   |
|--------------------|----------------------------------------|-----------------------------------------|
| Authentication     | Plaintext passwords, email-based lookup| Add JWT tokens, bcrypt/Argon2 hashing   |
| Authorization      | No role-based access control           | Add Spring Security roles (USER, ADMIN) |
| Booking Passengers | Stored as raw TEXT (JSON)              | Create `Passenger` entity with 1:M      |
| Pagination         | Not implemented                        | Add Spring Data `Pageable` to list APIs |
| Input Validation   | Basic Jakarta annotations              | Add custom validators, sanitization     |
| Error Handling     | Try-catch in controllers               | Global `@ControllerAdvice` handler      |
| API Documentation  | None                                   | Add Swagger / OpenAPI 3.0               |
| Testing            | None                                   | Add JUnit 5 + Mockito tests             |
| Logging            | System.out.println                     | Use SLF4J + Logback                     |
| Database Migrations| `ddl-auto=update` (risky in prod)      | Use Flyway or Liquibase                 |
| Environment Config | Hardcoded in properties file           | Use Spring Profiles + env variables     |

---

## 13. Database Schema (MySQL DDL)

```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    avios_balance INT DEFAULT 0,
    loyalty_tier VARCHAR(255) DEFAULT 'silver',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE flights (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    flight_number VARCHAR(255) NOT NULL,
    origin VARCHAR(3) NOT NULL,
    destination VARCHAR(3) NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    cabin_class VARCHAR(255),
    price DECIMAL(10,2),
    currency VARCHAR(255) DEFAULT 'USD',
    available_seats INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    flight_id BIGINT NOT NULL,
    booking_reference VARCHAR(8) UNIQUE,
    status VARCHAR(255) DEFAULT 'pending',
    total_price DECIMAL(10,2),
    currency VARCHAR(255) DEFAULT 'USD',
    passenger_count INT DEFAULT 1,
    passengers TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (flight_id) REFERENCES flights(id)
);
```

---

## 14. Frontend-Backend Integration Points

The React frontend (`qatar-airways-react/`) communicates with this backend via:

| Frontend Page    | Backend Endpoint(s) Used            |
|------------------|-------------------------------------|
| Login            | `POST /api/auth/login`              |
| Signup           | `POST /api/auth/register`           |
| Book Flight      | `GET /api/flights/search`, `POST /api/bookings` |
| My Bookings      | `GET /api/bookings?email=...`        |
| Destinations     | `GET /api/flights/destinations`      |
| Cancel Booking   | `DELETE /api/bookings/{id}?email=...`|

The frontend runs on port 5173 (Vite dev) and expects the backend at `http://localhost:5000`.