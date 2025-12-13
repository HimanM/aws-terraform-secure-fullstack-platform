# =============================================================================
# CloudFront Module
# =============================================================================
# Creates CloudFront distribution with Origin Access Control for S3

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# =============================================================================
# Origin Access Control
# =============================================================================

resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "${var.project_name}-frontend-oac"
  description                       = "OAC for ${var.project_name} frontend S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# =============================================================================
# Cache Policy - Respect Origin Cache Headers
# =============================================================================
# This policy respects Cache-Control headers set by S3:
# - HTML files: no-cache (always fresh)
# - Static assets (_next/): max-age=31536000 (1 year)

resource "aws_cloudfront_cache_policy" "caching_optimized" {
  name        = "${var.project_name}-caching-optimized"
  comment     = "Cache policy that respects origin headers for ${var.project_name}"
  min_ttl     = 0
  default_ttl = 86400      # 1 day default if no Cache-Control header
  max_ttl     = 31536000   # 1 year max for hashed assets

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

# =============================================================================
# CloudFront Function for URL Rewriting
# =============================================================================
# This function rewrites URLs to properly serve Next.js static export files
# - /screenshots/ -> /screenshots/index.html
# - /demo/ -> /demo/index.html

resource "aws_cloudfront_function" "url_rewrite" {
  name    = "${var.project_name}-url-rewrite"
  runtime = "cloudfront-js-2.0"
  comment = "Rewrite URLs for Next.js static export"
  publish = true
  code    = <<-EOF
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // If URI ends with '/', append index.html
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    // If URI doesn't have an extension, assume it's a directory and add /index.html
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }
    
    return request;
}
EOF
}

# =============================================================================
# CloudFront Distribution
# =============================================================================

resource "aws_cloudfront_distribution" "frontend" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  comment             = "${var.project_name} frontend distribution"
  price_class         = "PriceClass_100"  # US, Canada, Europe only (cheapest)

  # S3 Origin
  origin {
    domain_name              = var.s3_bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
    origin_id                = "S3Origin"
  }

  # Default cache behavior - CACHING DISABLED
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3Origin"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    # Use cache policy that respects origin Cache-Control headers
    cache_policy_id = aws_cloudfront_cache_policy.caching_optimized.id

    # CloudFront Function to rewrite URLs for Next.js static export
    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.url_rewrite.arn
    }
  }

  # Custom error responses - serve 404.html for actual not found errors
  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  # Logging (optional)
  dynamic "logging_config" {
    for_each = var.enable_logging ? [1] : []
    content {
      include_cookies = false
      bucket          = var.logging_bucket
      prefix          = "cloudfront/"
    }
  }

  tags = {
    Name = "${var.project_name}-frontend-distribution"
  }
}
