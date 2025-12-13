# =============================================================================
# Dev Environment - Main Configuration
# =============================================================================
# This is the main entry point for the dev environment.
# It calls all modules and wires them together.

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}

# =============================================================================
# Data Sources
# =============================================================================

data "aws_caller_identity" "current" {}

# =============================================================================
# CloudWatch Module (create first for log groups)
# =============================================================================

module "cloudwatch" {
  source = "../../modules/cloudwatch"

  project_name               = var.project_name
  aws_region                 = var.aws_region
  log_retention_days         = var.log_retention_days
  create_alarms              = var.create_alarms
  ecs_cluster_name           = module.ecs.cluster_name
  ecs_service_name           = module.ecs.service_name
  api_gateway_id             = module.api_gateway.api_id
  dynamodb_table_name        = module.dynamodb.table_name
  cloudfront_distribution_id = module.cloudfront.distribution_id
}

# =============================================================================
# Networking Module
# =============================================================================

module "networking" {
  source = "../../modules/networking"

  project_name   = var.project_name
  aws_region     = var.aws_region
  vpc_cidr       = var.vpc_cidr
  az_count       = var.az_count
  container_port = var.container_port
}

# =============================================================================
# ECR Module
# =============================================================================

module "ecr" {
  source = "../../modules/ecr"

  project_name = var.project_name
}

# =============================================================================
# DynamoDB Module
# =============================================================================

module "dynamodb" {
  source = "../../modules/dynamodb"

  project_name = var.project_name
}

# =============================================================================
# IAM Module
# =============================================================================

module "iam" {
  source = "../../modules/iam"

  project_name                = var.project_name
  dynamodb_table_arn          = module.dynamodb.table_arn
  create_github_oidc          = var.create_github_oidc
  github_repo                 = var.github_repo
  ecr_repository_arn          = module.ecr.repository_arn
  frontend_bucket_arn         = module.s3_frontend.bucket_arn
  cloudfront_distribution_arn = module.cloudfront.distribution_arn
  terraform_state_bucket_arn  = var.terraform_state_bucket_arn
  terraform_lock_table_arn    = var.terraform_lock_table_arn
}

# =============================================================================
# ECS Module
# =============================================================================

module "ecs" {
  source = "../../modules/ecs"

  project_name                = var.project_name
  aws_region                  = var.aws_region
  environment                 = var.environment
  vpc_id                      = module.networking.vpc_id
  private_subnet_ids          = module.networking.private_subnet_ids
  alb_security_group_id       = module.networking.alb_security_group_id
  ecs_tasks_security_group_id = module.networking.ecs_tasks_security_group_id
  ecs_execution_role_arn      = module.iam.ecs_execution_role_arn
  ecs_task_role_arn           = module.iam.ecs_task_role_arn
  ecr_repository_url          = module.ecr.repository_url
  image_tag                   = var.image_tag
  dynamodb_table_name         = module.dynamodb.table_name
  cloudwatch_log_group_name   = module.cloudwatch.ecs_log_group_name
  container_port              = var.container_port
  task_cpu                    = var.task_cpu
  task_memory                 = var.task_memory
  desired_count               = var.desired_count
}

# =============================================================================
# API Gateway Module
# =============================================================================

module "api_gateway" {
  source = "../../modules/api-gateway"

  project_name               = var.project_name
  vpc_link_security_group_id = module.networking.vpc_link_security_group_id
  private_subnet_ids         = module.networking.private_subnet_ids
  alb_listener_arn           = module.ecs.alb_listener_arn
  cloudwatch_log_group_arn   = module.cloudwatch.api_gateway_log_group_arn
  cors_allow_origins         = var.cors_allow_origins
}

# =============================================================================
# CloudFront Module (create before S3 for OAC)
# =============================================================================

module "cloudfront" {
  source = "../../modules/cloudfront"

  project_name                   = var.project_name
  s3_bucket_regional_domain_name = module.s3_frontend.bucket_regional_domain_name
  enable_logging                 = false
}

# =============================================================================
# S3 Frontend Module
# =============================================================================

module "s3_frontend" {
  source = "../../modules/s3-frontend"

  project_name                = var.project_name
  aws_account_id              = data.aws_caller_identity.current.account_id
  cloudfront_distribution_arn = module.cloudfront.distribution_arn
}
