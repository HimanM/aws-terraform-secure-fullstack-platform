# DevOps Project 9 - AWS Full-Stack Architecture

A learning project demonstrating modern AWS cloud architecture with Infrastructure as Code, CI/CD pipelines, and best practices for security and monitoring.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Users                                                                   │
│    │                                                                     │
│    ▼                                                                     │
│  CloudFront ──────▶ S3 (Next.js static)                                 │
│    │                                                                     │
│    │ /api/*                                                              │
│    ▼                                                                     │
│  API Gateway (HTTP API)                                                  │
│    │                                                                     │
│    ▼ VPC Link                                                            │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  VPC (Private Subnets)                                           │    │
│  │    │                                                             │    │
│  │    ▼                                                             │    │
│  │  Internal ALB ──▶ ECS Fargate (Python FastAPI) ──▶ DynamoDB     │    │
│  │                           │                         (VPC Endpoint)│    │
│  │                           ▼                                      │    │
│  │                    CloudWatch Logs                               │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ECR (Container Images)    S3 (Terraform State)    DynamoDB (TF Lock)   │
└─────────────────────────────────────────────────────────────────────────┘
```

## 🚀 Features

- **Static Frontend**: Next.js site on S3 with CloudFront CDN and Origin Access Control
- **Private Backend**: ECS Fargate in private subnets, only accessible via API Gateway VPC Link
- **Serverless Database**: DynamoDB with on-demand capacity and point-in-time recovery
- **Infrastructure as Code**: Modular Terraform with S3 backend and DynamoDB state locking
- **CI/CD Pipeline**: GitHub Actions with OIDC authentication (no long-lived credentials)
- **Monitoring**: CloudWatch dashboards, alarms, and Container Insights

## 📁 Project Structure

```
devops-project-9/
├── terraform/
│   ├── bootstrap/           # State backend (run first)
│   ├── environments/dev/    # Dev environment configuration
│   └── modules/             # Reusable infrastructure modules
│       ├── networking/      # VPC, subnets, NAT, endpoints
│       ├── ecr/             # Container registry
│       ├── ecs/             # Fargate cluster & service
│       ├── dynamodb/        # Items table
│       ├── api-gateway/     # HTTP API + VPC Link
│       ├── s3-frontend/     # Static hosting bucket
│       ├── cloudfront/      # CDN distribution
│       ├── cloudwatch/      # Monitoring
│       └── iam/             # Roles & policies
├── backend/
│   ├── app/                 # FastAPI application
│   ├── seed/                # Sample data
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/app/             # Next.js App Router
│   ├── package.json
│   └── next.config.js
├── scripts/                 # Deployment scripts
└── .github/workflows/       # CI/CD pipelines
```

## 🛠️ Prerequisites

- AWS CLI configured with appropriate credentials
- Terraform >= 1.5.0
- Docker
- Node.js >= 18
- Python >= 3.11

## 🚀 Deployment Guide

### 1. Bootstrap State Backend

```bash
cd terraform/bootstrap
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your AWS account ID

terraform init
terraform apply
```

### 2. Configure Backend

Update `terraform/environments/dev/backend.tf` with outputs from bootstrap.

### 3. Build and Push Docker Image

```bash
# First deploy ECR
cd terraform/environments/dev
terraform init
terraform apply -target=module.ecr

# Build and push
./scripts/build-and-push.sh  # or build-and-push.ps1 on Windows
```

### 4. Deploy Infrastructure

```bash
cd terraform/environments/dev
# Edit terraform.tfvars with your settings
terraform apply
```

### 5. Deploy Frontend

```bash
cd frontend
npm install
export NEXT_PUBLIC_API_URL="<api-gateway-url-from-terraform-output>"
npm run build
./scripts/deploy-frontend.sh  # or deploy-frontend.ps1 on Windows
```

### 6. Seed Database (Optional)

```bash
./scripts/seed-dynamodb.sh
```

## 🔒 Security Highlights

- **Private Backend**: ECS tasks run in private subnets with no public IP
- **S3 Bucket**: All public access blocked, CloudFront uses OAC
- **VPC Endpoints**: DynamoDB, ECR, S3, CloudWatch accessed privately
- **IAM**: Scoped permissions, GitHub Actions uses OIDC (no secrets)
- **Security Groups**: Least privilege traffic flow

## 📊 Monitoring

- CloudWatch Dashboard with key metrics
- Alarms for CPU, memory, API errors
- Container Insights enabled
- Access logs for API Gateway

## 🔧 GitHub Actions Secrets Required

| Secret | Description |
|--------|-------------|
| `AWS_ROLE_ARN` | ARN of the GitHub Actions IAM role |
| `API_GATEWAY_URL` | API Gateway endpoint URL |
| `S3_BUCKET_NAME` | Frontend S3 bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID |

## 💰 Cost Considerations

- **NAT Gateway**: ~$32/month (use VPC endpoints to reduce traffic)
- **ECS Fargate**: Pay per vCPU/memory/second
- **DynamoDB**: Pay per request (on-demand)
- **CloudFront**: Pay per request + data transfer
- **API Gateway**: $1/million requests (HTTP API)

## 📚 Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14, React, TailwindCSS |
| Backend | Python 3.11, FastAPI, boto3 |
| Database | Amazon DynamoDB |
| CDN | Amazon CloudFront |
| Compute | Amazon ECS Fargate |
| IaC | Terraform |
| CI/CD | GitHub Actions |

## 📝 License

MIT License - feel free to use this for learning!
