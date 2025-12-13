# =============================================================================
# S3 Frontend Module Variables
# =============================================================================

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
}

variable "aws_account_id" {
  description = "AWS account ID for unique bucket naming"
  type        = string
}

variable "cloudfront_distribution_arn" {
  description = "ARN of the CloudFront distribution for bucket policy"
  type        = string
}
