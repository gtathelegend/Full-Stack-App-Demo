# Full Stack Web Development Assessment

This project is a simple full stack CRM-style web application built for an internship assessment. It demonstrates frontend development with React.js and backend integration using Node.js, Express, and MongoDB.

The application includes authentication, protected routes, a dashboard, and MongoDB-backed data for leads, tasks, and users.

## Repository Details

- GitHub Repository: [https://github.com/gtathelegend/Full-Stack-App-Demo](https://github.com/gtathelegend/Full-Stack-App-Demo)
- Frontend Live Demo: [https://full-stack-app-demo.vercel.app/](https://full-stack-app-demo.vercel.app/)
- Backend Live API: [https://full-stack-app-demo.onrender.com](https://full-stack-app-demo.onrender.com)
- Backend Health Check: [https://full-stack-app-demo.onrender.com/health](https://full-stack-app-demo.onrender.com/health)

## Assignment Objective

Build a simple full stack web application that demonstrates:

- React.js frontend development
- Node.js backend development
- MongoDB data storage
- Authentication flow
- Dashboard implementation

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS Modules

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs

## Architecture

The project follows a separated frontend-backend architecture:

### High-Level Flow

1. The user opens the React frontend.
2. The user logs in with email and password.
3. The frontend sends the credentials to the backend login API.
4. The backend validates the user against MongoDB and returns a JWT token.
5. The frontend stores the token and user info in local storage.
6. Protected dashboard API calls include the token in the `Authorization` header.
7. The backend verifies the token and returns dashboard data from MongoDB.

### Frontend Architecture

- `frontend/src/App.jsx`
  Handles application routes.
- `frontend/src/context/AuthContext.jsx`
  Manages login, registration, logout, token persistence, and user state.
- `frontend/src/components/ProtectedRoute.jsx`
  Restricts access to protected pages like the dashboard and profile.
- `frontend/src/api/axios.js`
  Central Axios instance with JWT header injection and 401 handling.
- `frontend/src/pages/Login.jsx`
  Login form UI and validation.
- `frontend/src/pages/Dashboard.jsx`
  Dashboard UI and API integration.
- `frontend/src/components/*`
  Shared UI components such as navbar, sidebar, table, modal, toast, and cards.

### Backend Architecture

- `backend/server.js`
  Express server entry point and middleware registration.
- `backend/config/db.js`
  MongoDB connection setup.
- `backend/routes/authRoutes.js`
  Authentication routes.
- `backend/routes/dashboardRoutes.js`
  Protected dashboard routes.
- `backend/controllers/authController.js`
  Login, registration, and password change logic.
- `backend/controllers/dashboardController.js`
  Leads, tasks, users, and stats API handlers.
- `backend/middleware/authMiddleware.js`
  JWT verification and role-based access control.
- `backend/models/User.js`
  User schema with password hashing.
- `backend/models/Lead.js`
  Lead schema.
- `backend/models/Task.js`
  Task schema.

### Data Layer

MongoDB stores:

- Users
- Leads
- Tasks

Relationships:

- Leads are assigned to a user
- Tasks are assigned to a user

## Project Structure

```text
Full Stack App Demo/
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- scripts/
|   |-- package.json
|   `-- server.js
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- api/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- context/
|   |   |-- hooks/
|   |   `-- pages/
|   |-- package.json
|   `-- vite.config.js
|-- IMPLEMENTATION_SUMMARY.md
`-- README.md
```

## Assignment Features Implemented

### 1. Login Page

Implemented:

- Email input
- Password input
- Client-side form validation
- Invalid email format check
- Empty password validation
- Error messages for invalid input
- Login API integration
- Redirect to dashboard after successful login

### 2. Dashboard Page

Implemented:

- Protected dashboard route
- Display of logged-in user name
- Dashboard statistics
- Leads list
- Tasks list
- Users list
- API-driven dashboard data from backend

### 3. Backend Development

Implemented:

- `POST /api/auth/login` endpoint
- User credential validation against MongoDB
- JWT token generation after successful login
- Protected dashboard API endpoints
- MongoDB models for users, leads, and tasks
- Seed script to preload demo data

### 4. Bonus Features

Implemented:

- Logout functionality
- Protected routes
- JWT-based authentication
- Responsive UI
- Loading states
- Error handling
- Profile page
- Password change
- Create and delete leads
- Create and delete tasks

## Extra Features Beyond the Assignment

This project currently includes more than the base assessment asked for:

- User registration page
- Role-based access control for user list access
- Toast notification system
- Error boundary for frontend crash handling
- 404 page
- Rate limiting on auth endpoints
- Helmet security headers
- NoSQL injection sanitization
- Request logging with Morgan
- Standardized backend API responses
- Password hashing with bcryptjs
- Health check endpoint
- Update endpoints for leads and tasks

## API Endpoints

### Auth

- `POST /api/auth/login`
- `POST /api/auth/register`
- `PATCH /api/auth/profile/password`

### Dashboard

- `GET /api/dashboard/stats`
- `GET /api/dashboard/leads`
- `POST /api/dashboard/leads`
- `PATCH /api/dashboard/leads/:id`
- `DELETE /api/dashboard/leads/:id`
- `GET /api/dashboard/tasks`
- `POST /api/dashboard/tasks`
- `PATCH /api/dashboard/tasks/:id`
- `DELETE /api/dashboard/tasks/:id`
- `GET /api/dashboard/users`

## Demo Credentials

After seeding the database, use:

- Email: `admin@demo.com`
- Password: `Admin@123`

## Local Setup Instructions

### Prerequisites

- Node.js 18 or later recommended
- npm
- MongoDB local installation or MongoDB Atlas connection string

### 1. Clone the Repository

```bash
git clone https://github.com/gtathelegend/Full-Stack-App-Demo
cd "Full Stack App Demo"
```

### 2. Backend Setup

Open a terminal in the `backend` folder:

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Seed the database:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

Backend will run at:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal in the `frontend` folder:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

### 4. Login to the App

Use the seeded credentials:

- Email: `admin@demo.com`
- Password: `Admin@123`

## How to Run the Project

### Terminal 1

```bash
cd backend
npm run dev
```

### Terminal 2

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Deployment Notes

### Frontend

The project contains `frontend/vercel.json`, which is configured to proxy `/api` requests to:

[https://full-stack-app-demo.onrender.com/api](https://full-stack-app-demo.onrender.com/api)

### Backend

Confirmed backend deployment:

- API Base URL: [https://full-stack-app-demo.onrender.com](https://full-stack-app-demo.onrender.com)
- Health Route: [https://full-stack-app-demo.onrender.com/health](https://full-stack-app-demo.onrender.com/health)

### Frontend Live Link

[https://full-stack-app-demo.vercel.app/](https://full-stack-app-demo.vercel.app/)

## Contact

- LinkedIn: [https://www.linkedin.com/in/vedaangsharma2006/](https://www.linkedin.com/in/vedaangsharma2006/)
- Email: `vedaangsharma2006@gmail.com`
