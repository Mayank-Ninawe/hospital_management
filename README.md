# Hospital Management System

A comprehensive, full-stack Hospital Management System built with a Spring Boot backend and a React/TypeScript frontend.

## Prerequisites

- **Java**: 17+
- **Node.js**: 18+
- **Database**: MySQL 8+
- **Maven**: Latest version

## Setup and Installation

### Backend Setup
1. Configure your MySQL database credentials in `src/application.properties` (or `src/hms/config/application.properties`).
2. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the `hms-react` directory:
   ```bash
   cd hms-react
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Concurrent Development (Root)
You can run both backend and frontend via concurrently by using the `package.json` in the root directory:
```bash
npm install
npm run dev
```

## Environment Variables

| Variable | Description |
| -------- | ----------- |
| `VITE_API_URL` | Base URL for the backend API from the web app (e.g., `http://localhost:8080/api`). |
| `spring.datasource.url` | MySQL JDBC URL. |
| `spring.datasource.username` | MySQL Username. |
| `spring.datasource.password` | MySQL Password. |

## API Endpoints

### Authentication
- `POST /api/auth/login`: Authenticate and receive a JWT token.

### Patients
- `GET /api/patients`: Get all patients.
- `POST /api/patients`: Add a new patient.
- `PUT /api/patients/{id}/discharge`: Discharge a patient.

### Doctors
- `GET /api/doctors`: Get all doctors.
- `POST /api/doctors`: Add a new doctor.
- `DELETE /api/doctors/{id}`: Remove a doctor.

### Nurses
- `GET /api/nurses`: Get all nurses.
- `POST /api/nurses`: Add a new nurse.
- `DELETE /api/nurses/{id}`: Remove a nurse.

### Rooms
- `GET /api/rooms`: Get all rooms.
- `POST /api/rooms`: Allocate a room.
- `PUT /api/rooms/{num}/vacate`: Vacate a room.

### Appointments
- `GET /api/appointments`: Get all appointments.
- `POST /api/appointments`: Book an appointment.
- `PUT /api/appointments/{id}/status`: Update appointment status.
