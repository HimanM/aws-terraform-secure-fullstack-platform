# =============================================================================
# Deploy Frontend to S3 (PowerShell)
# =============================================================================
# Usage: .\scripts\deploy-frontend.ps1

$ErrorActionPreference = "Stop"

# Configuration
$AwsRegion = if ($env:AWS_REGION) { $env:AWS_REGION } else { "us-east-1" }
$ProjectName = if ($env:PROJECT_NAME) { $env:PROJECT_NAME } else { "devops-project-9" }

# Get AWS account ID
$AwsAccountId = aws sts get-caller-identity --query Account --output text
$S3Bucket = "$ProjectName-frontend-$AwsAccountId"

# Get CloudFront distribution ID (simplified - may need adjustment)
$Distributions = aws cloudfront list-distributions --query "DistributionList.Items[*].[Id,Origins.Items[0].DomainName]" --output json | ConvertFrom-Json
$DistributionId = $null
foreach ($dist in $Distributions) {
    if ($dist[1] -like "*$S3Bucket*") {
        $DistributionId = $dist[0]
        break
    }
}

if (-not $DistributionId) {
    Write-Host "❌ Could not find CloudFront distribution for bucket: $S3Bucket" -ForegroundColor Red
    exit 1
}

Write-Host "============================================="
Write-Host "Deploying Frontend to S3"
Write-Host "============================================="
Write-Host "S3 Bucket: $S3Bucket"
Write-Host "CloudFront ID: $DistributionId"
Write-Host "============================================="

# Build the frontend
Write-Host "Building frontend..."
Push-Location "$PSScriptRoot\..\frontend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
}

# Build
npm run build

# Sync to S3
Write-Host "Syncing to S3..."
aws s3 sync out/ "s3://$S3Bucket/" --delete

# Invalidate CloudFront
Write-Host "Invalidating CloudFront cache..."
$InvalidationId = aws cloudfront create-invalidation `
    --distribution-id $DistributionId `
    --paths "/*" `
    --query 'Invalidation.Id' `
    --output text

Pop-Location

$DomainName = aws cloudfront get-distribution --id $DistributionId --query 'Distribution.DomainName' --output text

Write-Host "============================================="
Write-Host "✅ Frontend deployed successfully!" -ForegroundColor Green
Write-Host "   Invalidation ID: $InvalidationId"
Write-Host ""
Write-Host "   Visit: https://$DomainName"
Write-Host "============================================="
