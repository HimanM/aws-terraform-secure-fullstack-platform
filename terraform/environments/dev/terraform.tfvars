# =============================================================================
# Dev Environment - Terraform Variables
# =============================================================================
# Customize these values for your environment

project_name = "devops-project-9"
aws_region   = "us-west-2"
environment  = "dev"

# Networking
vpc_cidr = "10.0.0.0/16"
az_count = 2

# ECS
container_port = 8000
image_tag      = "latest"
task_cpu       = "256"
task_memory    = "512"
desired_count  = 2

# CloudWatch
log_retention_days = 14
create_alarms      = true

# GitHub OIDC - Update with your repository
create_github_oidc = true
github_repo        = "HimanM/DevOps-Project-9"  # Case-sensitive!

# CORS - Update with your CloudFront domain after first deployment
cors_allow_origins = ["*"]

# Terraform State - Update after bootstrap
terraform_state_bucket_arn = "arn:aws:s3:::devops-project-9-terraform-state-603630702351"  # Add after bootstrap
terraform_lock_table_arn   = "arn:aws:dynamodb:us-west-2:603630702351:table/devops-project-9-terraform-locks"  # Add after bootstrap
