# =============================================================================
# Bootstrap Variables
# =============================================================================

variable "aws_region" {
  description = "AWS region for the state backend resources"
  type        = string
  default     = "us-west-2"
}

variable "aws_account_id" {
  description = "AWS account ID (used for unique bucket naming)"
  type        = string
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "devops-project-9"
}
