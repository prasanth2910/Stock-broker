# Frontend Port Configuration

To avoid port conflicts with the backend, the frontend needs to run on port 3001.

## Option 1: Create .env file
Create a `.env` file in the frontend directory with:
```
PORT=3001
REACT_APP_BACKEND_URL=http://localhost:3000
REACT_APP_DASHBOARD_URL=http://localhost:3002
```

## Option 2: Use package.json script
Update the start script in package.json:
```json
"scripts": {
  "start": "set PORT=3001 && react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

## Option 3: Command line
Run with: `set PORT=3001 && npm start`

## Current Configuration
- Backend: http://localhost:3000
- Frontend: http://localhost:3001  
- Dashboard: http://localhost:3002
