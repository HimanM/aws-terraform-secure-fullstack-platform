# =============================================================================
# IAM Module Variables
# =============================================================================

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
}

variable "dynamodb_table_arn" {
  description = "ARN of the DynamoDB table for ECS task permissions"
  type        = string
}

variable "create_github_oidc" {
  description = "Whether to create GitHub OIDC provider and role"
  type        = bool
  default     = true
}

variable "github_repo" {
  description = "GitHub repository in format owner/repo"
  type        = string
  default     = ""
}

variable "ecr_repository_arn" {
  description = "ARN of the ECR repository"
  type        = string
  default     = ""
}

variable "frontend_bucket_arn" {
  description = "ARN of the frontend S3 bucket"
  type        = string
  default     = ""
}

variable "cloudfront_distribution_arn" {
  description = "ARN of the CloudFront distribution"
  type        = string
  default     = ""
}

variable "terraform_state_bucket_arn" {
  description = "ARN of the Terraform state S3 bucket"
  type        = string
  default     = ""
}

variable "terraform_lock_table_arn" {
  description = "ARN of the Terraform lock DynamoDB table"
  type        = string
  default     = ""
}
