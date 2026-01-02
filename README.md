# TodoSafe – Secure JWT Architecture

TodoSafe is a reference implementation of a task management system focused on secure JWT authentication in distributed systems.  
Rather than being a conventional ToDo application, this project explores and solves the “Stateless vs Secure” dilemma using a Hybrid JWT Invalidation Strategy.

The objective is to demonstrate how to achieve immediate token revocation, high performance, and scalability without sacrificing JWT statelessness.

---

## Architecture Overview

The system follows a Layered Architecture with strict separation of concerns.  
All components are orchestrated using Docker Compose, enabling consistent and reproducible environments.

**Main layers:**

- Application layer (Spring Boot)
- Persistence layer (PostgreSQL)
- Cache layer (Redis)
- Client layer (React)

---

## Authentication & Authorization Design

### 1. Authentication Flow (Login)

![Login Flow](./images/login.png)

- User credentials are validated against securely hashed records (Bcrypt / Argon2) stored in PostgreSQL.
- Upon successful authentication, two tokens are issued:
  - Access Token (short-lived)
  - Refresh Token (long-lived)

This approach minimizes attack surface while maintaining usability.

---

### 2. Request Authorization Chain (Security Filter Chain)

![Authorization Flow](./images/auth-general.png)

Authorization is implemented using a high-performance validation pipeline based on the Chain of Responsibility pattern.

A custom `OncePerRequestFilter` is integrated into the Spring Security filter chain:

1. **JWT Validation**  
   Token structure and cryptographic signature are validated.

2. **Blacklist Verification (Redis)**  
   The token JTI is checked against a Redis-backed blacklist to ensure it has not been revoked.

3. **Security Context Population**  
   If the token is valid, user identity and roles are loaded into `SecurityContextHolder`, enabling Role-Based Access Control (RBAC).

---

### 3. Secure Logout (Hybrid Invalidation Strategy)

![Logout Flow](./images/logout.png)

JWTs are stateless by design, but secure logout requires controlled state.  
TodoSafe implements a hybrid invalidation strategy to guarantee immediate session termination:

- **Redis (Fast Invalidation)**  
  The JTI of the active access token is stored in Redis with a TTL equal to the remaining token lifetime, preventing replay attacks across all replicas.

- **PostgreSQL (Persistent Revocation)**  
  The refresh token is marked as `revoked = true`, preventing further access token generation.

---

## Technology Stack

### Backend
- Language: Java 25
- Framework: Spring Boot
- Database: PostgreSQL
- Cache: Redis
- Build Tool: Maven

### Frontend
- Framework: React
- HTTP Client: Axios

### Infrastructure
- Containerization: Docker
- Orchestration: Docker Compose

---

## Key Features

- JWT authentication with access and refresh token rotation
- High-performance token revocation using Redis blacklisting
- Scheduled cleanup jobs for expired and revoked tokens
- Fully dockerized environment
- RESTful API design with proper HTTP status codes
- OpenAPI / Swagger documentation

---

## Future Roadmap

- [ ] Reactive migration to Spring WebFlux (Project Reactor)
- [ ] CI/CD pipelines using GitHub Actions
- [ ] Monitoring with Prometheus and Grafana
