#!/bin/bash
# =============================================================================
# Seed DynamoDB with Sample Data
# =============================================================================
# Usage: ./scripts/seed-dynamodb.sh

set -e

# Configuration
AWS_REGION="${AWS_REGION:-us-west-2}"
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

# Check if Python is available (try py for Windows first, then python3, then python)
PYTHON_CMD=""
if command -v py &>/dev/null && py -3 --version &>/dev/null; then
    PYTHON_CMD="py -3"
elif command -v python3 &>/dev/null && python3 --version &>/dev/null; then
    PYTHON_CMD="python3"
elif command -v python &>/dev/null && python --version 2>&1 | grep -q "Python 3"; then
    PYTHON_CMD="python"
else
    echo "❌ Python3 is required but not installed."
    exit 1
fi

echo "Using Python: $PYTHON_CMD"

# Export environment variables for the script
export AWS_REGION="${AWS_REGION}"
export DYNAMODB_TABLE_NAME="${TABLE_NAME}"

# Run seed script
$PYTHON_CMD seed_db.py

echo "============================================="
echo "✅ Database seeded successfully!"
echo "============================================="
