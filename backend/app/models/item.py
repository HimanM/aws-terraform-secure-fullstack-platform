# =============================================================================
# Item Models
# =============================================================================

from typing import Optional
from pydantic import BaseModel, Field


class ItemBase(BaseModel):
    """Base item model."""
    name: str = Field(..., min_length=1, max_length=100, description="Item name")
    description: Optional[str] = Field(None, max_length=500, description="Item description")
    category: Optional[str] = Field(None, max_length=50, description="Item category")
    price: float = Field(..., ge=0, description="Item price")


class ItemCreate(ItemBase):
    """Model for creating an item."""
    pass


class ItemUpdate(BaseModel):
    """Model for updating an item (all fields optional)."""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    category: Optional[str] = Field(None, max_length=50)
    price: Optional[float] = Field(None, ge=0)


class ItemResponse(ItemBase):
    """Model for item response."""
    id: str
    created_at: str
    updated_at: str
    
    class Config:
        from_attributes = True


class Item(ItemBase):
    """Full item model with metadata."""
    id: str
    pk: str
    sk: str
    created_at: str
    updated_at: str
