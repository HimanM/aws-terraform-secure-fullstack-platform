# =============================================================================
# Build and Push Backend Image to ECR (PowerShell)
# =============================================================================
# Usage: .\scripts\build-and-push.ps1 [-ImageTag "latest"]

param(
    [string]$ImageTag = "latest"
)

$ErrorActionPreference = "Stop"

# Configuration
$AwsRegion = if ($env:AWS_REGION) { $env:AWS_REGION } else { "us-west-2" }
$ProjectName = if ($env:PROJECT_NAME) { $env:PROJECT_NAME } else { "devops-project-9" }

# Get AWS account ID
$AwsAccountId = aws sts get-caller-identity --query Account --output text
$EcrRegistry = "$AwsAccountId.dkr.ecr.$AwsRegion.amazonaws.com"
$EcrRepository = "$ProjectName-backend"
$FullImage = "$EcrRegistry/$EcrRepository"

Write-Host "============================================="
Write-Host "Building and pushing to ECR"
Write-Host "============================================="
Write-Host "Registry: $EcrRegistry"
Write-Host "Repository: $EcrRepository"
Write-Host "Tag: $ImageTag"
Write-Host "============================================="

# Login to ECR
Write-Host "Logging in to ECR..."
aws ecr get-login-password --region $AwsRegion | docker login --username AWS --password-stdin $EcrRegistry

# Build the image
Write-Host "Building Docker image..."
Push-Location "$PSScriptRoot\..\backend"
docker build -t "${EcrRepository}:${ImageTag}" .

# Tag the image
Write-Host "Tagging image..."
docker tag "${EcrRepository}:${ImageTag}" "${FullImage}:${ImageTag}"
docker tag "${EcrRepository}:${ImageTag}" "${FullImage}:latest"

# Push the image
Write-Host "Pushing image to ECR..."
docker push "${FullImage}:${ImageTag}"
docker push "${FullImage}:latest"

Pop-Location

Write-Host "============================================="
Write-Host "✅ Successfully pushed:"
Write-Host "   ${FullImage}:${ImageTag}"
Write-Host "   ${FullImage}:latest"
Write-Host "============================================="
