# =============================================================================
# API Gateway Module Outputs
# =============================================================================

output "api_id" {
  description = "ID of the HTTP API"
  value       = aws_apigatewayv2_api.main.id
}

output "api_endpoint" {
  description = "Endpoint URL of the HTTP API"
  value       = aws_apigatewayv2_api.main.api_endpoint
}

output "api_arn" {
  description = "ARN of the HTTP API"
  value       = aws_apigatewayv2_api.main.arn
}

output "vpc_link_id" {
  description = "ID of the VPC Link"
  value       = aws_apigatewayv2_vpc_link.main.id
}

output "vpc_link_arn" {
  description = "ARN of the VPC Link"
  value       = aws_apigatewayv2_vpc_link.main.arn
}

output "stage_id" {
  description = "ID of the API stage"
  value       = aws_apigatewayv2_stage.main.id
}

output "stage_invoke_url" {
  description = "Invoke URL for the API stage"
  value       = aws_apigatewayv2_stage.main.invoke_url
}
