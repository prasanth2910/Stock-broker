# Zerodha Clone - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Start All Services
```bash
npm run dev
```

Or use the provided scripts:
- Windows: `start.bat`
- PowerShell: `start.ps1`

## Port Configuration

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| Backend | 3000 | http://localhost:3000 | API Server |
| Frontend | 3001 | http://localhost:3001 | Landing Page, Login, Signup |
| Dashboard | 3002 | http://localhost:3002 | Trading Dashboard |

## Environment Variables

### Backend (.env)
Create a `.env` file in the `backend` directory:
```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/zerodha_clone
JWT_SECRET=your_super_secret_jwt_key_here
```

### Frontend (.env)
Create a `.env` file in the `frontend` directory:
```env
PORT=3001
REACT_APP_BACKEND_URL=http://localhost:3000
REACT_APP_DASHBOARD_URL=http://localhost:3002
```

### Dashboard (.env)
Create a `.env` file in the `dashboard` directory:
```env
REACT_APP_BACKEND_URL=http://localhost:3000
```

## Authentication Flow

1. **User visits frontend** (http://localhost:3001)
2. **User signs up/logs in** → Backend validates credentials
3. **Backend returns JWT token** → Frontend stores in localStorage
4. **Frontend redirects to dashboard** (http://localhost:3002)
5. **Dashboard uses JWT token** → Makes authenticated API calls to backend

## Manual Startup (if npm run dev fails)

### Terminal 1 - Backend
```bash
cd backend
npm start
```

### Terminal 2 - Frontend  
```bash
cd frontend
npm start
```

### Terminal 3 - Dashboard
```bash
cd dashboard
npm start
```

## Troubleshooting

### Port Already in Use
- Backend (3000): Check if another service is using port 3000
- Frontend (3001): Check if another React app is running
- Dashboard (3002): Check if another service is using port 3002

### CORS Issues
- Ensure backend CORS is configured for ports 3001 and 3002
- Check that frontend and dashboard are using correct backend URL

### Authentication Issues
- Verify JWT_SECRET is set in backend .env
- Check that tokens are being stored in localStorage
- Ensure backend is running and accessible

## Development

### Adding New Features
1. **Backend**: Add routes in `backend/routes/`
2. **Frontend**: Add components in `frontend/src/`
3. **Dashboard**: Add components in `dashboard/src/`

### Database Changes
- Update schemas in `backend/schemas/`
- Update models in `backend/model/`
- Restart backend after schema changes

## API Endpoints

### Public
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Protected (Require JWT Token)
- `GET /api/auth/profile` - User profile
- `GET /api/allHoldings` - User holdings
- `GET /api/allPositions` - User positions  
- `POST /api/newOrder` - Place order

## Testing the Setup

1. **Backend Health Check**: http://localhost:3000/api/health
2. **Frontend**: http://localhost:3001
3. **Dashboard**: http://localhost:3002
4. **Test Registration**: Create account on frontend
5. **Test Login**: Login with created account
6. **Test Dashboard**: Should redirect to dashboard after login
