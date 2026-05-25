# Hospital Management System (Monorepo)

A complete Hospital Management System with a modular React/Vite/TS frontend and a resilient Spring Boot backend. 

## Tech Stack
* **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Zustand, React Router.
* **Backend**: Java 17, Spring Boot 3, Spring Security, Spring Data JPA, PostgreSQL.

## Folder Structure
* `frontend/` - React Application. Deploy via Vercel.
* `backend/` - Spring Boot Application. Deploy via Railway, Render, or any Docker provider.

## Local Setup

### 1. Environment Variables
Create `.env.example` in root, frontend, and backend. 
**Backend `.env`**:
```ini
DB_URL=jdbc:postgresql://localhost:5432/hms
DB_USERNAME=postgres
DB_PASSWORD=postgres
JWT_SECRET=supersecret...
FRONTEND_URL=http://localhost:5173
```
**Frontend `.env`**:
```ini
VITE_API_URL=http://localhost:8080/api
```

### 2. Run Locally
Run this from the project root (requires `npm run install:frontend` once):
```bash
npm run dev
```
Alternatively, run them separately:
* Backend: `cd backend && ./mvnw spring-boot:run`
* Frontend: `cd frontend && npm run dev`

## Deployment

### Frontend (Vercel)
Connect the Git repository to Vercel.
- Framework Preset: Vite
- Root Directory: `frontend`
- Build Command: `npm run build`
- Add `VITE_API_URL` to Vercel Environment Variables targeting your deployed backend.

### Backend (Render / Railway)
- **Render**: Connect repository, use the `render.yaml` blueprint provided. It will automatically detect sub-directory Dockerfile and build.
- **Railway**: Uses the `railway.json` configuration config targeting `backend/Dockerfile`. Include PostgreSQL in Railway and map environment credentials to your railway app's Variables.
