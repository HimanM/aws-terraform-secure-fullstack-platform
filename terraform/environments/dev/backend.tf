# =============================================================================
# Dev Environment - Backend Configuration
# =============================================================================
# Configure this after running terraform/bootstrap
# Replace the placeholder values with outputs from bootstrap

terraform {
  backend "s3" {
    bucket         = "devops-project-9-terraform-state-ACCOUNT_ID"  # Replace ACCOUNT_ID
    key            = "dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "devops-project-9-terraform-locks"
  }
}
