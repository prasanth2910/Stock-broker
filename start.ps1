Write-Host "Starting Zerodha Clone Services..." -ForegroundColor Green
Write-Host ""
Write-Host "Backend will run on port 3000" -ForegroundColor Yellow
Write-Host "Frontend will run on port 3001" -ForegroundColor Yellow  
Write-Host "Dashboard will run on port 3002" -ForegroundColor Yellow
Write-Host ""
Write-Host "Starting all services..." -ForegroundColor Cyan
npm run dev
