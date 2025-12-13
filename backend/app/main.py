# =============================================================================
# FastAPI Backend - Main Application
# =============================================================================

import os
import uuid
from datetime import datetime
from typing import Optional
from contextlib import asynccontextmanager

import boto3
from botocore.exceptions import ClientError
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from app.models.item import Item, ItemCreate, ItemUpdate, ItemResponse
from app.config import settings


# =============================================================================
# DynamoDB Client
# =============================================================================

def get_dynamodb_table():
    """Get DynamoDB table resource."""
    dynamodb = boto3.resource(
        "dynamodb",
        region_name=settings.aws_region,
    )
    return dynamodb.Table(settings.dynamodb_table_name)


# =============================================================================
# Lifespan
# =============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    # Startup
    print(f"Starting {settings.project_name} API...")
    print(f"Environment: {settings.environment}")
    print(f"DynamoDB Table: {settings.dynamodb_table_name}")
    yield
    # Shutdown
    print("Shutting down...")


# =============================================================================
# FastAPI App
# =============================================================================

app = FastAPI(
    title="DevOps Project 9 API",
    description="A simple CRUD API for learning AWS architecture",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with CloudFront domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =============================================================================
# Health Check
# =============================================================================

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint for ALB."""
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to DevOps Project 9 API",
        "docs": "/docs",
        "health": "/health",
    }


# =============================================================================
# CRUD Operations
# =============================================================================

@app.post("/items", response_model=ItemResponse, status_code=status.HTTP_201_CREATED, tags=["Items"])
async def create_item(item: ItemCreate):
    """Create a new item."""
    table = get_dynamodb_table()
    
    item_id = str(uuid.uuid4())
    timestamp = datetime.utcnow().isoformat()
    
    db_item = {
        "PK": f"ITEM#{item_id}",
        "SK": "METADATA",
        "id": item_id,
        "name": item.name,
        "description": item.description,
        "category": item.category,
        "price": str(item.price),  # DynamoDB doesn't support float, store as string
        "created_at": timestamp,
        "updated_at": timestamp,
    }
    
    try:
        table.put_item(Item=db_item)
        return ItemResponse(
            id=item_id,
            name=item.name,
            description=item.description,
            category=item.category,
            price=item.price,
            created_at=timestamp,
            updated_at=timestamp,
        )
    except ClientError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create item: {str(e)}"
        )


@app.get("/items", response_model=list[ItemResponse], tags=["Items"])
async def list_items(category: Optional[str] = None):
    """List all items, optionally filtered by category."""
    table = get_dynamodb_table()
    
    try:
        # Use GSI to query by SK (all METADATA items)
        response = table.query(
            IndexName="GSI1",
            KeyConditionExpression="SK = :sk",
            ExpressionAttributeValues={":sk": "METADATA"}
        )
        
        items = []
        for db_item in response.get("Items", []):
            if category and db_item.get("category") != category:
                continue
            items.append(ItemResponse(
                id=db_item["id"],
                name=db_item["name"],
                description=db_item.get("description", ""),
                category=db_item.get("category", ""),
                price=float(db_item.get("price", 0)),
                created_at=db_item.get("created_at", ""),
                updated_at=db_item.get("updated_at", ""),
            ))
        
        return items
    except ClientError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to list items: {str(e)}"
        )


@app.get("/items/{item_id}", response_model=ItemResponse, tags=["Items"])
async def get_item(item_id: str):
    """Get a specific item by ID."""
    table = get_dynamodb_table()
    
    try:
        response = table.get_item(
            Key={
                "PK": f"ITEM#{item_id}",
                "SK": "METADATA"
            }
        )
        
        db_item = response.get("Item")
        if not db_item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Item {item_id} not found"
            )
        
        return ItemResponse(
            id=db_item["id"],
            name=db_item["name"],
            description=db_item.get("description", ""),
            category=db_item.get("category", ""),
            price=float(db_item.get("price", 0)),
            created_at=db_item.get("created_at", ""),
            updated_at=db_item.get("updated_at", ""),
        )
    except ClientError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get item: {str(e)}"
        )


@app.put("/items/{item_id}", response_model=ItemResponse, tags=["Items"])
async def update_item(item_id: str, item: ItemUpdate):
    """Update an existing item."""
    table = get_dynamodb_table()
    
    # First check if item exists
    try:
        response = table.get_item(
            Key={
                "PK": f"ITEM#{item_id}",
                "SK": "METADATA"
            }
        )
        
        if not response.get("Item"):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Item {item_id} not found"
            )
        
        db_item = response["Item"]
        timestamp = datetime.utcnow().isoformat()
        
        # Update only provided fields
        update_expression = "SET updated_at = :updated_at"
        expression_values = {":updated_at": timestamp}
        
        if item.name is not None:
            update_expression += ", #name = :name"
            expression_values[":name"] = item.name
        if item.description is not None:
            update_expression += ", description = :description"
            expression_values[":description"] = item.description
        if item.category is not None:
            update_expression += ", category = :category"
            expression_values[":category"] = item.category
        if item.price is not None:
            update_expression += ", price = :price"
            expression_values[":price"] = str(item.price)
        
        expression_attribute_names = {}
        if item.name is not None:
            expression_attribute_names["#name"] = "name"
        
        update_kwargs = {
            "Key": {"PK": f"ITEM#{item_id}", "SK": "METADATA"},
            "UpdateExpression": update_expression,
            "ExpressionAttributeValues": expression_values,
            "ReturnValues": "ALL_NEW"
        }
        
        if expression_attribute_names:
            update_kwargs["ExpressionAttributeNames"] = expression_attribute_names
        
        response = table.update_item(**update_kwargs)
        updated_item = response["Attributes"]
        
        return ItemResponse(
            id=updated_item["id"],
            name=updated_item["name"],
            description=updated_item.get("description", ""),
            category=updated_item.get("category", ""),
            price=float(updated_item.get("price", 0)),
            created_at=updated_item.get("created_at", ""),
            updated_at=updated_item.get("updated_at", ""),
        )
    except ClientError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update item: {str(e)}"
        )


@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Items"])
async def delete_item(item_id: str):
    """Delete an item."""
    table = get_dynamodb_table()
    
    try:
        # Check if item exists
        response = table.get_item(
            Key={
                "PK": f"ITEM#{item_id}",
                "SK": "METADATA"
            }
        )
        
        if not response.get("Item"):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Item {item_id} not found"
            )
        
        # Delete the item
        table.delete_item(
            Key={
                "PK": f"ITEM#{item_id}",
                "SK": "METADATA"
            }
        )
    except ClientError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete item: {str(e)}"
        )


# =============================================================================
# Lambda Handler (for future use)
# =============================================================================

handler = Mangum(app)
