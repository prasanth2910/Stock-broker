# Zerodha Clone

A full-stack trading application with frontend, dashboard, and backend services.

## Port Configuration

- **Backend**: Port 3000 (API server)
- **Frontend**: Port 3001 (Landing page, Login, Signup)
- **Dashboard**: Port 3002 (Trading dashboard)

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
The backend will run on http://localhost:3000

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will run on http://localhost:3000

### 3. Dashboard Setup
```bash
cd dashboard
npm install
npm start
```
The dashboard will run on http://localhost:3002

## Authentication Flow

1. Users can sign up or login through the frontend (port 3000)
2. After successful authentication, users are redirected to the dashboard (port 3002)
3. The dashboard uses the JWT token from localStorage to authenticate API calls
4. All API calls go through the backend (port 3000)

## Environment Variables

Create `.env` files in each directory with the following variables:

### Backend (.env)
```
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:3000
REACT_APP_DASHBOARD_URL=http://localhost:3002
```

### Dashboard (.env)
```
REACT_APP_BACKEND_URL=http://localhost:3000
```

## Features

- User registration and authentication
- JWT-based authentication
- Trading dashboard with holdings, positions, and orders
- Real-time data visualization
- Responsive design

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/allHoldings` - Get all holdings (protected)
- `GET /api/allPositions` - Get all positions (protected)
- `POST /api/newOrder` - Create new order (protected)
