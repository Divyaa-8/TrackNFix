# TrackNFix - Smart Complaint Management System

A full-stack MERN web application for registering complaints, tracking complaint status, managing complaints as an admin, and viewing analytics reports.

## Tech Stack

- Frontend: React.js, React Router DOM, Axios, Tailwind CSS, Recharts, React Hot Toast
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Multer
- Database: MongoDB

## Project Structure

```text
Complaint management Sysyem/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    uploads/
    utils/
    .env
    server.js
  frontend/
    src/
      components/
      context/
      hooks/
      layouts/
      pages/
      services/
    .env
  README.md
  package.json
```

## Requirements

Install these before running the project:

- Node.js
- npm
- MongoDB Community Server, or MongoDB Atlas

Check versions:

```bash
node -v
npm -v
```

## Environment Files

Backend environment file:

[backend/.env](backend/.env)

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart_complaints
JWT_SECRET=development_secret_change_before_deployment
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Frontend environment file:

[frontend/.env](frontend/.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_UPLOAD_URL=http://localhost:5000
```

If `.env` files are missing, copy the examples:

```bash
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

## How To Run The Project

### 1. Open Project Folder

Open a terminal in the main project folder:

```bash
cd "C:\Users\asus\Desktop\React Project\Complaint management Sysyem"
```

### 2. Install Dependencies

Install backend and frontend packages:

```bash
npm run install:all
```

If PowerShell blocks `npm`, use:

```bash
npm.cmd run install:all
```

### 3. Start MongoDB

Make sure MongoDB is running locally.

Local MongoDB URI:

```text
mongodb://127.0.0.1:27017/smart_complaints
```

If you use MongoDB Atlas, replace `MONGO_URI` in `backend/.env`.

### 4. Add Sample Data

Run this once to create sample users and complaints:

```bash
npm run seed
```

PowerShell alternative:

```bash
npm.cmd run seed
```

Sample login accounts:

```text
Admin
Email: admin@example.com
Password: admin123

User
Email: user@example.com
Password: user123
```

Important: the seed command clears existing users and complaints, then inserts sample data.

### 5. Run Backend

Open Terminal 1:

```bash
npm run dev:backend
```

Or:

```bash
cd backend
node server.js
```

Backend runs at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

### 6. Run Frontend

Open Terminal 2:

```bash
npm run dev:frontend
```

Frontend runs at:

```text
http://localhost:5173
```

Open this URL in the browser:

```text
http://localhost:5173
```

## Useful Commands

Install all dependencies:

```bash
npm run install:all
```

Run backend:

```bash
npm run dev:backend
```

Run frontend:

```bash
npm run dev:frontend
```

Seed database:

```bash
npm run seed
```

Build frontend:

```bash
npm run build
```

## Main Features

- User registration and login
- JWT authentication
- Password hashing using bcrypt
- User and Admin roles
- Protected routes
- Complaint registration
- Complaint image upload
- Complaint status tracking
- Complaint history
- Admin dashboard
- Complaint filtering and searching
- Status and priority updates
- Analytics charts
- Responsive UI

## API Endpoints

Authentication:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

Complaints:

```text
POST   /api/complaints
GET    /api/complaints
GET    /api/complaints/:id
PUT    /api/complaints/:id
DELETE /api/complaints/:id
```

Admin:

```text
GET /api/admin/dashboard
GET /api/admin/users
PUT /api/admin/status/:id
```

User:

```text
PUT /api/users/profile
```

## Common Errors And Fixes

### Error: `EADDRINUSE: address already in use :::5000`

This means the backend is already running on port `5000`.

Find the process:

```powershell
netstat -ano | findstr :5000
```

Stop it using the PID:

```powershell
taskkill /PID YOUR_PID /F
```

Then run backend again:

```bash
npm run dev:backend
```

### Error: `localhost refused to connect`

This means the frontend or backend server is not running.

Start both:

```bash
npm run dev:backend
npm run dev:frontend
```

Use two separate terminals.

### Admin Login Not Working

Run the seed command:

```bash
npm run seed
```

Then login with:

```text
admin@example.com
admin123
```

### PowerShell Blocks npm

Use `npm.cmd`:

```bash
npm.cmd run dev:backend
npm.cmd run dev:frontend
```

## Postman Testing

1. Login using:

```text
POST http://localhost:5000/api/auth/login
```

2. Copy the token from the response.

3. Add this header to protected requests:

```text
Authorization: Bearer YOUR_TOKEN
```

4. For complaint creation with image, use `multipart/form-data`:

```text
title
description
category
priority
image
```

## Deployment Notes

Backend:

- Deploy backend to Render, Railway, or any Node.js hosting service.
- Set environment variables on the hosting platform.
- Use MongoDB Atlas for production database.
- For production image uploads, Cloudinary is recommended instead of local uploads.

Frontend:

- Set `VITE_API_URL` to deployed backend URL.
- Build frontend:

```bash
npm run build
```

- Deploy `frontend/dist` to Vercel, Netlify, or another static hosting platform.

## Future Enhancements

- AI-based complaint categorization
- Email notifications
- SMS alerts
- Multi-language support
- Chat support
- Complaint escalation system
