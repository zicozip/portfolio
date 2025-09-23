# Quick deployment script for Netlify auto-sync
param(
    [string]$Message = "Update portfolio"
)

Write-Host "🚀 Deploying changes to Netlify..." -ForegroundColor Green
Write-Host "Commit message: $Message" -ForegroundColor Yellow

# Add all changes
Write-Host "📁 Staging files..." -ForegroundColor Blue
git add -A

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Blue
git commit -m "$Message"

# Push to trigger deployment
Write-Host "🌐 Pushing to GitHub (triggers Netlify deploy)..." -ForegroundColor Blue
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "🔄 Netlify will automatically deploy in ~1-2 minutes" -ForegroundColor Cyan
    Write-Host "🌍 Check your Netlify dashboard for deployment status" -ForegroundColor White
} else {
    Write-Host "❌ Push failed!" -ForegroundColor Red
}