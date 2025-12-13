#!/bin/bash
# =============================================================================
# Build and Push Backend Image to ECR
# =============================================================================
# Usage: ./scripts/build-and-push.sh [image-tag]

set -e

# Configuration
AWS_REGION="${AWS_REGION:-us-west-2}"
PROJECT_NAME="${PROJECT_NAME:-devops-project-9}"
IMAGE_TAG="${1:-latest}"

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
ECR_REPOSITORY="${PROJECT_NAME}-backend"
FULL_IMAGE="${ECR_REGISTRY}/${ECR_REPOSITORY}"

echo "============================================="
echo "Building and pushing to ECR"
echo "============================================="
echo "Registry: ${ECR_REGISTRY}"
echo "Repository: ${ECR_REPOSITORY}"
echo "Tag: ${IMAGE_TAG}"
echo "============================================="

# Login to ECR
echo "Logging in to ECR..."
aws ecr get-login-password --region ${AWS_REGION} | \
    docker login --username AWS --password-stdin ${ECR_REGISTRY}

# Build the image
echo "Building Docker image..."
cd "$(dirname "$0")/../backend"
docker build -t ${ECR_REPOSITORY}:${IMAGE_TAG} .

# Tag the image
echo "Tagging image..."
docker tag ${ECR_REPOSITORY}:${IMAGE_TAG} ${FULL_IMAGE}:${IMAGE_TAG}
docker tag ${ECR_REPOSITORY}:${IMAGE_TAG} ${FULL_IMAGE}:latest

# Push the image
echo "Pushing image to ECR..."
docker push ${FULL_IMAGE}:${IMAGE_TAG}
docker push ${FULL_IMAGE}:latest

echo "============================================="
echo "✅ Successfully pushed:"
echo "   ${FULL_IMAGE}:${IMAGE_TAG}"
echo "   ${FULL_IMAGE}:latest"
echo "============================================="
