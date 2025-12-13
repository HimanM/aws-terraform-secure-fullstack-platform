#!/usr/bin/env python3
# =============================================================================
# Seed DynamoDB with Sample Data
# =============================================================================

import json
import uuid
import boto3
import os
from datetime import datetime

# Configuration
TABLE_NAME = os.environ.get("DYNAMODB_TABLE_NAME", "devops-project-9-items")
AWS_REGION = os.environ.get("AWS_REGION", "us-east-1")


def seed_database():
    """Seed the DynamoDB table with sample data."""
    
    # Initialize DynamoDB
    dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)
    table = dynamodb.Table(TABLE_NAME)
    
    # Load sample data
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_file = os.path.join(script_dir, "sample_data.json")
    
    with open(data_file, "r") as f:
        items = json.load(f)
    
    print(f"Seeding {len(items)} items to table: {TABLE_NAME}")
    
    # Insert each item
    for item_data in items:
        item_id = str(uuid.uuid4())
        timestamp = datetime.utcnow().isoformat()
        
        db_item = {
            "PK": f"ITEM#{item_id}",
            "SK": "METADATA",
            "id": item_id,
            "name": item_data["name"],
            "description": item_data.get("description", ""),
            "category": item_data.get("category", ""),
            "price": str(item_data["price"]),
            "created_at": timestamp,
            "updated_at": timestamp,
        }
        
        table.put_item(Item=db_item)
        print(f"  ✓ Created: {item_data['name']} ({item_id})")
    
    print(f"\n✅ Successfully seeded {len(items)} items!")


if __name__ == "__main__":
    seed_database()
