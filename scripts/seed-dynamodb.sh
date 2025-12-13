#!/bin/bash
# =============================================================================
# Seed DynamoDB with Sample Data
# =============================================================================
# Usage: ./scripts/seed-dynamodb.sh

set -e

# Configuration
AWS_REGION="${AWS_REGION:-us-east-1}"
PROJECT_NAME="${PROJECT_NAME:-devops-project-9}"
TABLE_NAME="${DYNAMODB_TABLE_NAME:-${PROJECT_NAME}-items}"

echo "============================================="
echo "Seeding DynamoDB Table"
echo "============================================="
echo "Table: ${TABLE_NAME}"
echo "Region: ${AWS_REGION}"
echo "============================================="

# Check if table exists
if ! aws dynamodb describe-table --table-name ${TABLE_NAME} --region ${AWS_REGION} &>/dev/null; then
    echo "❌ Table ${TABLE_NAME} does not exist!"
    exit 1
fi

# Run the Python seed script
cd "$(dirname "$0")/../backend/seed"

# Check if Python is available
if ! command -v python3 &>/dev/null; then
    echo "❌ Python3 is required but not installed."
    exit 1
fi

# Export environment variables for the script
export AWS_REGION="${AWS_REGION}"
export DYNAMODB_TABLE_NAME="${TABLE_NAME}"

# Run seed script
python3 seed_db.py

echo "============================================="
echo "✅ Database seeded successfully!"
echo "============================================="
