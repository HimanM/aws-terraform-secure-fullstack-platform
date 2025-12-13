# =============================================================================
# Application Configuration
# =============================================================================

import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Project
    project_name: str = "devops-project-9"
    environment: str = "dev"
    
    # AWS
    aws_region: str = "us-west-2"
    dynamodb_table_name: str = "devops-project-9-items"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
