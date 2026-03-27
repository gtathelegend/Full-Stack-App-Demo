# Full Stack CRM Application

A modern full-stack CRM web application with authentication, dashboard, and data management. Built with React.js, Node.js, Express, and MongoDB.

## Features

- ✅ User authentication with JWT
- ✅ Protected routes and pages
- ✅ Login form with validation
- ✅ Dashboard with statistics
- ✅ **CRUD operations** - Add and delete Leads and Tasks
- ✅ Leads, Tasks, and Users management
- ✅ Professional UI with custom CSS
- ✅ Responsive design (mobile-friendly)
- ✅ Logout functionality
- ✅ Modal dialogs for creating new items
- ✅ Delete confirmations
- ✅ Real-time stats updates after CRUD operations

## Tech Stack

**Frontend:**
- React.js with Vite
- React Router for navigation
- Axios for API calls
- jwt-decode for token management
- Pure CSS with custom properties

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## Project Structure

```
Full Stack App Demo/
├── backend/                 # Node.js Express server
│   ├── config/             # Database connection
│   ├── models/             # MongoDB schemas (User, Lead, Task)
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth middleware
│   ├── routes/             # API endpoints
│   ├── scripts/            # Database seeding
│   ├── server.js           # Entry point
│   ├── package.json
│   └── .env               # Environment variables
│
└── frontend/               # React Vite application
    ├── src/
    │   ├── pages/         # Login, Dashboard pages
    │   ├── components/    # Navbar, Sidebar, StatCard, DataTable
    │   ├── context/       # Auth context
    │   ├── hooks/         # useAuth hook
    │   ├── api/           # Axios configuration
    │   ├── App.jsx        # Routing
    │   └── index.css      # Global styles
    ├── package.json
    └── vite.config.js     # Vite configuration
```

## Prerequisites

- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB** (running locally on port 27017)

## Installation & Setup

### 1. Start MongoDB

Ensure MongoDB is running locally:
```bash
# On Windows with MongoDB installed
mongod

# Or using MongoDB Atlas cloud (update MONGO_URI in .env)
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already provided with demo values)
# Verify values in .env:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/crm_demo
JWT_SECRET=crm_demo_super_secret_key_for_assessment_123456

# Seed database with initial data
npm run seed

# Start backend server (runs on http://localhost:5000)
npm run dev
```

### 3. Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev
```

## Usage

### Login Credentials

After seeding, use these credentials to login:
- **Email:** `admin@demo.com`
- **Password:** `Admin@123`

### Available Routes

- `/` - Login page
- `/dashboard` - Dashboard (protected)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password

### Dashboard - Read Operations (Protected Routes)
- `GET /api/dashboard/leads` - Fetch leads
- `GET /api/dashboard/tasks` - Fetch tasks
- `GET /api/dashboard/users` - Fetch users
- `GET /api/dashboard/stats` - Fetch statistics

### Dashboard - Write Operations (Protected Routes)
- `POST /api/dashboard/leads` - Create new lead
- `DELETE /api/dashboard/leads/:id` - Delete lead by ID
- `POST /api/dashboard/tasks` - Create new task
- `DELETE /api/dashboard/tasks/:id` - Delete task by ID

All protected routes require Bearer token in Authorization header:
```
Authorization: Bearer <token>
```

## Features Demonstrated

### Frontend
- Form validation with error messages
- Protected routes with redirection
- JWT token storage and retrieval
- API error handling with 401 auto-logout
- Responsive layout with sidebar and navbar
- Data tables with status badges
- Loading states and spinners

### Backend
- Secure password hashing with bcryptjs (12 rounds)
- JWT token generation and verification
- MongoDB schema relationships with Mongoose
- Input validation and error handling
- CORS configuration
- Protected route middleware

## Testing Checklist

1. ✅ Open `http://localhost:5173`
2. ✅ Try submitting empty form - should show validation errors
3. ✅ Try wrong password - should show error message
4. ✅ Login with `admin@demo.com` / `Admin@123`
5. ✅ Dashboard loads with user greeting and data
6. ✅ Refresh page - should stay logged in
7. ✅ Click logout - should return to login page
8. ✅ Try accessing `/dashboard` without login - should redirect to login

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGO_URI` in `.env` matches your MongoDB setup
- On Windows, MongoDB is typically at `mongodb://127.0.0.1:27017`

### CORS Error
- Backend CORS is configured for `http://localhost:5173`
- If using different port, update `vite.config.js` proxy and backend CORS settings

### Port Already in Use
- Backend: Change `PORT` in `.env` (default: 5000)
- Frontend: Vite will auto-increment port (default: 5173)

### Token Expired
- Tokens expire in 7 days
- Login again to get a new token
- 401 responses automatically clear token and redirect to login

## Security Features

- JWT tokens stored in localStorage with expiry validation
- Bcrypt password hashing (12 salt rounds)
- Generic authentication error messages (don't reveal if email exists)
- Protected routes with middleware verification
- CORS enabled for frontend origin only
- HTTP-only recommendations in production

## Development Notes

- All API responses include error messages for debugging
- Console logs available in browser DevTools
- Backend uses ES modules (`"type": "module"`)
- No TypeScript - vanilla JavaScript for simplicity
- CSS modules for component styling

## Deployment

### Option 1: Deploy with Render (Backend) + Vercel (Frontend) - Recommended

This is the easiest way to deploy for a free assessment project.

#### Step 1: Deploy Backend to Render

1. **Create Render Account**
   - Go to [render.com](https://render.com) and sign up
   - Connect your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Render Service**
   - **Name:** `crm-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node backend/server.js`
   - **Root Directory:** `backend`

4. **Add Environment Variables** (in Render dashboard):
   ```
   PORT=5000
   MONGO_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<your-secret-key>
   FRONTEND_URL=<your-vercel-frontend-url> (add after frontend deployment)
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Note the URL: `https://crm-backend.onrender.com`

#### Step 2: Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com) and sign up
   - Connect your GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Vercel auto-detects it's a Monorepo

3. **Configure Deployment**
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variables:** None needed (proxy in vercel.json)

4. **Update vercel.json** (already provided)
   - File: `frontend/vercel.json`
   - Update the backend URL:
     ```json
     {
       "rewrites": [
         {
           "source": "/api/:path*",
           "destination": "https://crm-backend.onrender.com/api/:path*"
         }
       ]
     }
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)
   - Note your Vercel URL

#### Step 3: Update Backend FRONTEND_URL

1. Go back to Render dashboard
2. Select the `crm-backend` service
3. Go to "Environment" settings
4. Update `FRONTEND_URL` to your Vercel URL (e.g., `https://crm-demo.vercel.app`)
5. Click "Save" and service will redeploy

#### Verify Deployment

1. Open your Vercel frontend URL
2. Login with `admin@demo.com` / `Admin@123`
3. Try adding a lead or task - should sync with backend
4. Refresh page - data should persist

### Option 2: Deploy Full Stack on Railway.app

Railway offers a simpler all-in-one solution:

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Railway auto-deploys both frontend and backend
5. Set environment variables same as above
6. Done! (Easier than Render + Vercel)

### Option 3: Deploy on Heroku (Legacy - Free tier removed)

Note: Heroku free tier was discontinued. Use Render or Railway instead.

## Production Checklist

Before deploying, ensure:

- ✅ `.env` is in `.gitignore` (don't commit sensitive data)
- ✅ `NODE_ENV=production` in production environment
- ✅ `FRONTEND_URL` matches your deployed frontend
- ✅ MongoDB Atlas is accessible from Render/Railway IPs
- ✅ CORS origin is correctly set to your frontend URL
- ✅ Seed script has been run (or seed production DB separately)

## Accessing Deployed App

After deployment:

1. **Frontend:** `https://your-app.vercel.app`
2. **Backend Health Check:** `https://crm-backend.onrender.com/health`
3. **Login:** Use `admin@demo.com` / `Admin@123` (or create new users)

## Future Enhancements

- Implement user roles and permissions
- Add data pagination and filtering
- Email verification and password reset
- Dark mode support
- API documentation with Swagger
- Unit and integration tests
- Update operations for leads and tasks
- Bulk operations (delete multiple items)
- Advanced filtering and search
