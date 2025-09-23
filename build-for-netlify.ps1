# PowerShell script to build and prepare for Netlify deployment

Write-Host "Building portfolio for Netlify deployment..." -ForegroundColor Green

# Clean previous build
if (Test-Path "build") {
    Remove-Item -Recurse -Force "build"
    Write-Host "Cleaned previous build" -ForegroundColor Yellow
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Blue
npm install

# Build the project
Write-Host "Building project..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host "The 'build' folder is ready for deployment" -ForegroundColor Green
    Write-Host "You can now:" -ForegroundColor Yellow
    Write-Host "1. Drag the 'build' folder to Netlify dashboard" -ForegroundColor White
    Write-Host "2. Or push to GitHub if Git is configured" -ForegroundColor White
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}