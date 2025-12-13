# =============================================================================
# Dev Environment - Backend Configuration
# =============================================================================
# Configure this after running terraform/bootstrap
# Replace the placeholder values with outputs from bootstrap

terraform {
  backend "s3" {
    bucket         = "devops-project-9-terraform-state-603630702351"  # Replace ACCOUNT_ID
    key            = "dev/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "devops-project-9-terraform-locks"
  }
}
