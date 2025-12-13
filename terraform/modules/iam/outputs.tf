# =============================================================================
# IAM Module Outputs
# =============================================================================

output "ecs_execution_role_arn" {
  description = "ARN of the ECS execution role"
  value       = aws_iam_role.ecs_execution.arn
}

output "ecs_execution_role_name" {
  description = "Name of the ECS execution role"
  value       = aws_iam_role.ecs_execution.name
}

output "ecs_task_role_arn" {
  description = "ARN of the ECS task role"
  value       = aws_iam_role.ecs_task.arn
}

output "ecs_task_role_name" {
  description = "Name of the ECS task role"
  value       = aws_iam_role.ecs_task.name
}

output "api_gateway_cloudwatch_role_arn" {
  description = "ARN of the API Gateway CloudWatch logging role"
  value       = aws_iam_role.api_gateway_cloudwatch.arn
}

output "github_actions_role_arn" {
  description = "ARN of the GitHub Actions role (if created)"
  value       = var.create_github_oidc ? aws_iam_role.github_actions[0].arn : null
}

output "github_oidc_provider_arn" {
  description = "ARN of the GitHub OIDC provider (if created)"
  value       = var.create_github_oidc ? aws_iam_openid_connect_provider.github[0].arn : null
}
