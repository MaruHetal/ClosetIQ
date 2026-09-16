$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js is missing. Install the LTS version from https://nodejs.org then run this file again."
  exit 1
}

Write-Host "Installing dependencies from package-lock.json..."
npm ci

Write-Host "Starting ClosetIQ..."
npm start -- --open
