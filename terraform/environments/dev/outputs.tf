# =============================================================================
# Dev Environment - Outputs
# =============================================================================

# -----------------------------------------------------------------------------
# Networking
# -----------------------------------------------------------------------------

output "vpc_id" {
  description = "ID of the VPC"
  value       = module.networking.vpc_id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = module.networking.private_subnet_ids
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = module.networking.public_subnet_ids
}

# -----------------------------------------------------------------------------
# ECR
# -----------------------------------------------------------------------------

output "ecr_repository_url" {
  description = "URL of the ECR repository"
  value       = module.ecr.repository_url
}

output "ecr_repository_name" {
  description = "Name of the ECR repository"
  value       = module.ecr.repository_name
}

# -----------------------------------------------------------------------------
# ECS
# -----------------------------------------------------------------------------

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = module.ecs.cluster_name
}

output "ecs_service_name" {
  description = "Name of the ECS service"
  value       = module.ecs.service_name
}

output "ecs_task_definition_family" {
  description = "Family of the task definition"
  value       = module.ecs.task_definition_family
}

output "internal_alb_dns" {
  description = "DNS name of the internal ALB"
  value       = module.ecs.alb_dns_name
}

# -----------------------------------------------------------------------------
# API Gateway
# -----------------------------------------------------------------------------

output "api_gateway_endpoint" {
  description = "Endpoint URL of the API Gateway"
  value       = module.api_gateway.api_endpoint
}

output "api_gateway_id" {
  description = "ID of the API Gateway"
  value       = module.api_gateway.api_id
}

# -----------------------------------------------------------------------------
# DynamoDB
# -----------------------------------------------------------------------------

output "dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  value       = module.dynamodb.table_name
}

output "dynamodb_table_arn" {
  description = "ARN of the DynamoDB table"
  value       = module.dynamodb.table_arn
}

# -----------------------------------------------------------------------------
# Frontend
# -----------------------------------------------------------------------------

output "frontend_bucket_name" {
  description = "Name of the frontend S3 bucket"
  value       = module.s3_frontend.bucket_id
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = module.cloudfront.distribution_id
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = module.cloudfront.distribution_domain_name
}

# -----------------------------------------------------------------------------
# IAM
# -----------------------------------------------------------------------------

output "github_actions_role_arn" {
  description = "ARN of the GitHub Actions role"
  value       = module.iam.github_actions_role_arn
}

# -----------------------------------------------------------------------------
# URLs
# -----------------------------------------------------------------------------

output "frontend_url" {
  description = "URL to access the frontend"
  value       = "https://${module.cloudfront.distribution_domain_name}"
}

output "api_url" {
  description = "URL to access the API"
  value       = module.api_gateway.api_endpoint
}
