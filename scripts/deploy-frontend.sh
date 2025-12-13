#!/bin/bash
# =============================================================================
# Deploy Frontend to S3 and Invalidate CloudFront
# =============================================================================
# Usage: ./scripts/deploy-frontend.sh

set -e

# Configuration
AWS_REGION="${AWS_REGION:-us-east-1}"
PROJECT_NAME="${PROJECT_NAME:-devops-project-9}"

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
S3_BUCKET="${PROJECT_NAME}-frontend-${AWS_ACCOUNT_ID}"

# Get CloudFront distribution ID
DISTRIBUTION_ID=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Origins.Items[0].DomainName=='${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com'].Id" \
    --output text)

if [ -z "$DISTRIBUTION_ID" ]; then
    echo "❌ Could not find CloudFront distribution for bucket: ${S3_BUCKET}"
    exit 1
fi

echo "============================================="
echo "Deploying Frontend to S3"
echo "============================================="
echo "S3 Bucket: ${S3_BUCKET}"
echo "CloudFront ID: ${DISTRIBUTION_ID}"
echo "============================================="

# Build the frontend
echo "Building frontend..."
cd "$(dirname "$0")/../frontend"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build
npm run build

# Sync to S3
echo "Syncing to S3..."
aws s3 sync out/ s3://${S3_BUCKET}/ \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html" \
    --exclude "_next/data/*"

# HTML files with shorter cache
aws s3 sync out/ s3://${S3_BUCKET}/ \
    --cache-control "public, max-age=0, must-revalidate" \
    --exclude "*" \
    --include "*.html"

# Invalidate CloudFront
echo "Invalidating CloudFront cache..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id ${DISTRIBUTION_ID} \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)

echo "============================================="
echo "✅ Frontend deployed successfully!"
echo "   Invalidation ID: ${INVALIDATION_ID}"
echo ""
echo "   Visit: https://$(aws cloudfront get-distribution \
    --id ${DISTRIBUTION_ID} \
    --query 'Distribution.DomainName' \
    --output text)"
echo "============================================="
