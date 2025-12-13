# DevOps Project 9 - AWS Full-Stack Architecture

<div align="center">

[![Frontend Deploy](https://github.com/HimanM/DevOps-Project-9/actions/workflows/frontend.yml/badge.svg)](https://github.com/HimanM/DevOps-Project-9/actions/workflows/frontend.yml)
[![Backend Deploy](https://github.com/HimanM/DevOps-Project-9/actions/workflows/backend.yml/badge.svg)](https://github.com/HimanM/DevOps-Project-9/actions/workflows/backend.yml)
[![Terraform](https://github.com/HimanM/DevOps-Project-9/actions/workflows/terraform.yml/badge.svg)](https://github.com/HimanM/DevOps-Project-9/actions/workflows/terraform.yml)
[![Update Outputs](https://github.com/HimanM/DevOps-Project-9/actions/workflows/update-outputs.yml/badge.svg)](https://github.com/HimanM/DevOps-Project-9/actions/workflows/update-outputs.yml)

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

</div>

---

## Website Preview

<div align="center">

| Home Page | Architecture |
|:---------:|:------------:|
| ![Home](docs/website_screenshots/live_site_home.png) | ![Architecture](docs/website_screenshots/live_site_architecture.png) |

| Live Demo | Terraform |
|:---------:|:---------:|
| ![Demo](docs/website_screenshots/live_site_live_demo.png) | ![Terraform](docs/website_screenshots/live_site_terraform.png) |

</div>

---

## Demo Video

<video width="640" height="360" controls>
  <source src="docs/demo_video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

---

## Live Deployment

<!-- FRONTEND_DEPLOY_START -->

| 🌐 **Live Site** | https://d3sb7cb2qzqglh.cloudfront.net |
|-----------------|---------------|
| 📅 Last Deploy | 2025-12-13 06:20:43 UTC |
| 🔖 Commit | `6043e9fafdfca6dbc333a977e9948440adc99078` |
<!-- FRONTEND_DEPLOY_END -->

---

## Infrastructure Outputs

<!-- TERRAFORM_OUTPUTS_START -->

| Resource | Value |
|----------|-------|
| **CloudFront URL** | https://d3sb7cb2qzqglh.cloudfront.net |
| **API Gateway URL** | https://sqo1ewnme4.execute-api.us-west-2.amazonaws.com |
| **S3 Bucket** | devops-project-9-frontend-603630702351 |
| **ECR Repository** | 603630702351.dkr.ecr.us-west-2.amazonaws.com/devops-project-9-backend |
| **ECS Cluster** | devops-project-9-cluster |
| **DynamoDB Table** | devops-project-9-items |
| **CloudWatch Dashboard** | [View Dashboard](https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#dashboards:name=devops-project-9-dashboard) |
| **GitHub Actions Role** | `arn:aws:iam::603630702351:role/devops-project-9-github-actions-role` |

_Last updated: 2025-12-13 05:20:04 UTC_
<!-- TERRAFORM_OUTPUTS_END -->

---

**A production-ready AWS cloud architecture demonstrating modern DevOps practices with Infrastructure as Code, containerized microservices, and CI/CD automation.**

[Architecture](#architecture-overview) | [Quick Start](#quick-start) | [Setup Guide](#step-by-step-setup-guide) | [Screenshots](#aws-console-screenshots) | [Tech Stack](#tech-stack)

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Step-by-Step Setup Guide](#step-by-step-setup-guide)
  - [Step 1: Bootstrap Terraform State Backend](#step-1-bootstrap-terraform-state-backend)
  - [Step 2: Create ECR Repository](#step-2-create-ecr-repository)
  - [Step 3: Build and Push Docker Image](#step-3-build-and-push-docker-image)
  - [Step 4: Deploy Core Infrastructure](#step-4-deploy-core-infrastructure)
  - [Step 5: Deploy Frontend](#step-5-deploy-frontend)
  - [Step 6: Seed Database](#step-6-seed-database-optional)
- [Architecture Deep Dive](#architecture-deep-dive)
- [Terraform Modules Explained](#terraform-modules-explained)
- [CI/CD Pipeline](#cicd-pipeline)
- [Security Best Practices](#security-best-practices)
- [Monitoring and Observability](#monitoring-and-observability)
- [AWS Console Screenshots](#aws-console-screenshots)
- [Cost Considerations](#cost-considerations)
- [Troubleshooting](#troubleshooting)
- [Official Documentation Links](#official-documentation-links)

---

## Architecture Overview

This project implements a **secure, scalable, and cost-efficient** full-stack architecture on AWS using Infrastructure as Code (Terraform).
![Architecture Diagram](docs/architecture_diagram.png)

### Request Flow Explained

1. **User Request** - CloudFront receives the request at an edge location closest to the user
2. **Static Content** - CloudFront serves cached static files directly from S3 (via OAC)
3. **API Request** - `/api/*` requests are routed to API Gateway HTTP API
4. **VPC Link** - API Gateway uses a VPC Link to securely connect to the private VPC
5. **Load Balancer** - Internal ALB distributes traffic across Fargate tasks
6. **Backend Processing** - FastAPI containers process the request
7. **Database** - DynamoDB accessed via VPC Gateway Endpoint (no internet)
8. **Response** - Returns through the same path back to user

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Zero-Trust Security** | Backend runs in private subnets with no public IP. All traffic flows through controlled gateways. |
| **Serverless & Scalable** | ECS Fargate auto-scales containers. DynamoDB scales automatically with on-demand billing. |
| **Global CDN** | CloudFront delivers content from 400+ edge locations worldwide with sub-millisecond latency. |
| **Infrastructure as Code** | 100% of infrastructure defined in Terraform with modular, reusable components. |
| **GitOps CI/CD** | GitHub Actions with OIDC authentication - no long-lived AWS credentials stored. |
| **Full Observability** | CloudWatch dashboards, Container Insights, and automated alarms. |
| **Cost Optimized** | VPC endpoints reduce NAT costs. On-demand billing. No idle resources. |

---

## Project Structure

```
devops-project-9/
│
├── terraform/                         # Infrastructure as Code
│   ├── bootstrap/                     # State backend (run first)
│   │   ├── main.tf                    # S3 bucket + DynamoDB for state
│   │   ├── variables.tf               # Input variables
│   │   ├── outputs.tf                 # Output values for dev environment
│   │   └── terraform.tfvars.example   # Example configuration
│   │
│   ├── environments/
│   │   └── dev/                       # Development environment
│   │       ├── main.tf                # Module orchestration
│   │       ├── variables.tf           # Environment variables
│   │       ├── outputs.tf             # Exported values
│   │       ├── backend.tf             # S3 backend configuration
│   │       └── terraform.tfvars       # Environment-specific values
│   │
│   └── modules/                       # Reusable infrastructure modules
│       ├── networking/                # VPC, subnets, NAT, endpoints, security groups
│       ├── ecr/                       # Elastic Container Registry
│       ├── ecs/                       # Fargate cluster, service, task definition
│       ├── dynamodb/                  # Items table with PITR
│       ├── api-gateway/               # HTTP API + VPC Link
│       ├── s3-frontend/               # Static hosting bucket
│       ├── cloudfront/                # CDN distribution with OAC
│       ├── cloudwatch/                # Monitoring, dashboards, alarms
│       └── iam/                       # Roles, policies, OIDC
│
├── backend/                           # FastAPI Application
│   ├── app/
│   │   ├── main.py                    # FastAPI app entry point
│   │   ├── models.py                  # Pydantic data models
│   │   ├── database.py                # DynamoDB client
│   │   └── routes/                    # API route handlers
│   ├── seed/
│   │   └── seed_db.py                 # Sample data seeder
│   ├── Dockerfile                     # Container image definition
│   └── requirements.txt               # Python dependencies
│
├── frontend/                          # Next.js Application
│   ├── src/app/                       # App Router pages
│   │   ├── page.tsx                   # Home page
│   │   ├── architecture/              # Architecture diagram page
│   │   ├── demo/                      # Live CRUD demo
│   │   ├── terraform/                 # Setup guide page
│   │   └── screenshots/               # AWS screenshots gallery
│   ├── public/                        # Static assets
│   ├── next.config.js                 # Next.js configuration
│   └── tailwind.config.ts             # Tailwind CSS configuration
│
├── scripts/                           # Automation scripts
│   ├── build-and-push.sh              # Build & push Docker image to ECR
│   ├── deploy-frontend.sh             # Deploy frontend to S3 + invalidate CDN
│   └── seed-dynamodb.sh               # Seed database with sample data
│
├── .github/workflows/                 # CI/CD Pipelines
│   ├── terraform.yml                  # Infrastructure deployment
│   ├── backend.yml                    # Backend container deployment
│   ├── frontend.yml                   # Frontend static deployment
│   └── update-outputs.yml             # Update README with outputs
│
└── docs/                              # Documentation & Screenshots
    ├── aws_screenshots/               # AWS Console screenshots
    └── cli_screenshots/               # CLI deployment screenshots
```

---

## Prerequisites

Before you begin, ensure you have the following tools installed:

| Tool | Version | Installation |
|------|---------|--------------|
| **AWS CLI** | v2.x | [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) |
| **Terraform** | >= 1.5.0 | [Install Terraform](https://developer.hashicorp.com/terraform/install) |
| **Docker** | Latest | [Install Docker](https://docs.docker.com/get-docker/) |
| **Node.js** | >= 18 | [Install Node.js](https://nodejs.org/) |
| **Python** | >= 3.11 | [Install Python](https://www.python.org/downloads/) |
| **Git** | Latest | [Install Git](https://git-scm.com/downloads) |

### AWS CLI Configuration

```bash
# Configure AWS credentials
aws configure

# Verify configuration
aws sts get-caller-identity
```

> **Reference**: [AWS CLI Configuration Guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)

---

## Quick Start

For experienced users who want to deploy quickly:

```bash
# 1. Clone the repository
git clone https://github.com/HimanM/DevOps-Project-9.git
cd DevOps-Project-9

# 2. Bootstrap state backend
cd terraform/bootstrap
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your AWS account ID
terraform init && terraform apply

# 3. Deploy ECR first
cd ../environments/dev
terraform init
terraform apply -target="module.ecr"

# 4. Build and push Docker image
cd ../../..
./scripts/build-and-push.sh

# 5. Deploy all infrastructure
cd terraform/environments/dev
terraform apply

# 6. Deploy frontend
cd ../../..
export NEXT_PUBLIC_API_URL=$(cd terraform/environments/dev && terraform output -raw api_gateway_endpoint)
./scripts/deploy-frontend.sh

# 7. (Optional) Seed database
./scripts/seed-dynamodb.sh
```

---

## Step-by-Step Setup Guide

### Step 1: Bootstrap Terraform State Backend

Terraform needs a secure location to store its state file. This step creates:
- **S3 Bucket**: Stores the Terraform state file with versioning and encryption
- **DynamoDB Table**: Prevents concurrent modifications with state locking

#### Why This Matters

Without remote state:
- Team members can't collaborate (state is local)
- State file can be lost (no backup)
- Concurrent runs can corrupt infrastructure

> **Reference**: [Terraform Backend Configuration](https://developer.hashicorp.com/terraform/language/settings/backends/s3)

#### Commands Explained

```bash
# Navigate to bootstrap directory
cd terraform/bootstrap

# Copy the example configuration
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with your AWS account ID:
```hcl
aws_account_id = "123456789012"  # Your 12-digit AWS account ID
aws_region     = "us-west-2"     # Your preferred region
project_name   = "devops-project-9"
```

```bash
# Initialize Terraform (downloads AWS provider)
terraform init
```

**What `terraform init` does:**
- Downloads the AWS provider plugin
- Initializes the working directory
- Prepares Terraform for planning and applying

```bash
# Preview changes before applying
terraform plan

# Apply the configuration
terraform apply
```

**What `terraform apply` creates:**

| Resource | Purpose | Configuration |
|----------|---------|---------------|
| S3 Bucket | State storage | Versioning enabled, AES-256 encryption, public access blocked |
| DynamoDB Table | State locking | PAY_PER_REQUEST billing, LockID hash key |

#### Expected Output

![Bootstrap Terraform Init](docs/cli_screenshots/1_bootstrap_terraform_init.png)
*Terraform initialization downloading required providers*

![Bootstrap Terraform Apply](docs/cli_screenshots/2_bootstrap_terraform_apply_outputs.png)
*Terraform apply showing created resources and outputs*

**Save the outputs** - you'll need them for the next step:
```
state_bucket_name = "devops-project-9-terraform-state-123456789012"
dynamodb_table_name = "devops-project-9-terraform-locks"
```

---

### Step 2: Create ECR Repository

Before deploying the full infrastructure, we need to create the ECR repository to store our Docker image.

#### Why ECR First?

The ECS module requires a Docker image to exist. Without it, Terraform will fail. ECR must be created first so we can push an image before deploying ECS.

> **Reference**: [Amazon ECR User Guide](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html)

#### Commands Explained

```bash
# Navigate to dev environment
cd terraform/environments/dev

# Initialize with S3 backend
terraform init
```

**What `terraform init` does here:**
- Configures the S3 backend (from bootstrap)
- Downloads all module providers
- Links modules together

```bash
# Apply ONLY the ECR module
terraform apply -target="module.ecr"
```

**The `-target` flag:**
- Deploys only the specified module
- Useful for bootstrapping dependencies
- Should be avoided in normal operations (can cause state drift)

#### What This Creates

| Resource | Description |
|----------|-------------|
| ECR Repository | `devops-project-9-backend` |
| Lifecycle Policy | Keeps last 10 images, removes untagged after 1 day |
| Image Scanning | Scans on push for vulnerabilities |

#### Expected Output

![ECR Module Apply](docs/cli_screenshots/3_terraform_apply_target_module_ecr.png)
*Targeted Terraform apply creating only ECR resources*

---

### Step 3: Build and Push Docker Image

Now we build the FastAPI backend container and push it to ECR.

#### The Dockerfile Explained

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies first (layer caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app/ ./app/

# Run with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

> **Reference**: [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

#### Script Breakdown

The `build-and-push.sh` script:

```bash
# Set configuration
AWS_REGION="${AWS_REGION:-us-west-2}"
PROJECT_NAME="${PROJECT_NAME:-devops-project-9}"
IMAGE_TAG="${1:-latest}"

# Get AWS account ID dynamically
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Construct ECR registry URL
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
ECR_REPOSITORY="${PROJECT_NAME}-backend"
```

**What each command does:**

```bash
# Authenticate Docker to ECR (token valid for 12 hours)
aws ecr get-login-password --region ${AWS_REGION} | \
    docker login --username AWS --password-stdin ${ECR_REGISTRY}
```

This command:
1. Gets a temporary authentication token from ECR
2. Pipes it to `docker login`
3. Authenticates Docker to push images

```bash
# Build the Docker image
docker build -t ${ECR_REPOSITORY}:${IMAGE_TAG} .
```

This command:
1. Reads the Dockerfile
2. Executes each instruction
3. Creates a local image

```bash
# Tag for ECR
docker tag ${ECR_REPOSITORY}:${IMAGE_TAG} ${FULL_IMAGE}:${IMAGE_TAG}
docker tag ${ECR_REPOSITORY}:${IMAGE_TAG} ${FULL_IMAGE}:latest

# Push to ECR
docker push ${FULL_IMAGE}:${IMAGE_TAG}
docker push ${FULL_IMAGE}:latest
```

> **Reference**: [Pushing Docker Images to ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html)

#### Running the Script

```bash
# From project root
./scripts/build-and-push.sh

# Or with a custom tag
./scripts/build-and-push.sh v1.0.0
```

#### Expected Output

![Build and Push](docs/cli_screenshots/4_build_and_push_script.png)
*Docker build and push to ECR*

---

### Step 4: Deploy Core Infrastructure

Now deploy all remaining infrastructure modules.

#### What Gets Created

| Module | Resources | Purpose |
|--------|-----------|---------|
| **networking** | VPC, Subnets, NAT Gateway, VPC Endpoints, Security Groups | Network isolation and connectivity |
| **ecs** | Cluster, Service, Task Definition, ALB | Container orchestration |
| **dynamodb** | Items table | Data persistence |
| **api-gateway** | HTTP API, VPC Link, Routes | External API access |
| **s3-frontend** | Bucket with OAC policy | Static file hosting |
| **cloudfront** | Distribution with OAC | Global CDN |
| **cloudwatch** | Log groups, Dashboard, Alarms | Monitoring |
| **iam** | Roles, Policies, OIDC Provider | Security |

#### Commands

```bash
cd terraform/environments/dev

# Review all changes
terraform plan

# Apply all infrastructure
terraform apply
```

#### Expected Output

![Dev Terraform Apply](docs/cli_screenshots/5_dev_terraform_apply.png)
*Full infrastructure deployment*

The apply will show ~50-70 resources being created. Review the plan carefully before confirming.

**Important Outputs to Save:**

```hcl
api_gateway_endpoint         = "https://abc123.execute-api.us-west-2.amazonaws.com"
cloudfront_distribution_id   = "E1ABC2DEF3GHIJ"
cloudfront_domain_name       = "d123abc.cloudfront.net"
frontend_bucket_name         = "devops-project-9-frontend-123456789012"
github_actions_role_arn      = "arn:aws:iam::123456789012:role/devops-project-9-github-actions"
```

---

### Step 5: Deploy Frontend

Deploy the Next.js static site to S3 and invalidate the CloudFront cache.

#### Understanding Static Export

Next.js can export as a static site (HTML/CSS/JS only) when configured with:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',      // Static HTML export
  trailingSlash: true,   // /about/ instead of /about
  images: {
    unoptimized: true    // No image optimization server needed
  }
}
```

> **Reference**: [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

#### Setting the API URL

```bash
# Get the API Gateway URL from Terraform
export NEXT_PUBLIC_API_URL=$(cd terraform/environments/dev && terraform output -raw api_gateway_endpoint)

# Verify it's set
echo $NEXT_PUBLIC_API_URL
```

The `NEXT_PUBLIC_` prefix makes the variable available in browser code at build time.

#### Script Breakdown

```bash
# Build the frontend
npm run build
```

This creates the `out/` directory with static files.

```bash
# Sync to S3 with cache headers
aws s3 sync out/ s3://${S3_BUCKET}/ \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html" \
    --exclude "_next/data/*"
```

**Flags explained:**
- `--delete`: Remove files in S3 not in local
- `--cache-control`: Set browser caching (1 year for assets)
- `--exclude`: Don't apply long cache to HTML (changes often)

```bash
# HTML files with short cache
aws s3 sync out/ s3://${S3_BUCKET}/ \
    --cache-control "public, max-age=0, must-revalidate" \
    --exclude "*" \
    --include "*.html"
```

```bash
# Invalidate CloudFront cache
aws cloudfront create-invalidation \
    --distribution-id ${DISTRIBUTION_ID} \
    --paths "/*"
```

This forces CloudFront to fetch fresh content from S3.

> **Reference**: [CloudFront Cache Invalidation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html)

#### Running the Script

```bash
./scripts/deploy-frontend.sh
```

#### Expected Output

![Deploy Frontend](docs/cli_screenshots/6_deploy_frontend_script.png)
*Frontend build, S3 sync, and CloudFront invalidation*

---

### Step 6: Seed Database (Optional)

Populate DynamoDB with sample data for testing.

#### Script Breakdown

```bash
# Check if table exists
aws dynamodb describe-table --table-name ${TABLE_NAME}

# Run Python seed script
python3 seed_db.py
```

The seed script creates sample items:

```python
items = [
    {"name": "Laptop", "category": "Electronics", "price": 999.99},
    {"name": "Headphones", "category": "Electronics", "price": 149.99},
    # ... more items
]
```

> **Reference**: [DynamoDB PutItem](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.WriteItem.html)

#### Running the Script

```bash
./scripts/seed-dynamodb.sh
```

#### Expected Output

![Seed DynamoDB](docs/cli_screenshots/7_seed_dynamodb_script.png)
*Database seeding with sample data*

---

## Architecture Deep Dive

### Why This Architecture?

This architecture follows AWS Well-Architected Framework principles:

| Pillar | Implementation |
|--------|----------------|
| **Security** | Private subnets, VPC endpoints, OAC, least privilege IAM |
| **Reliability** | Multi-AZ deployment, health checks, auto-recovery |
| **Performance** | CloudFront CDN, internal ALB, on-demand scaling |
| **Cost Optimization** | VPC endpoints, Fargate spot, on-demand DynamoDB |
| **Operational Excellence** | IaC, CI/CD, CloudWatch monitoring |

> **Reference**: [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

### Network Architecture

```
VPC: 10.0.0.0/16
│
├── Public Subnets (for NAT Gateway)
│   ├── 10.0.0.0/24 (AZ-a)
│   └── 10.0.1.0/24 (AZ-b)
│
├── Private Subnets (for ECS Tasks)
│   ├── 10.0.10.0/24 (AZ-a)
│   └── 10.0.11.0/24 (AZ-b)
│
└── VPC Endpoints (Gateway & Interface)
    ├── DynamoDB (Gateway)
    ├── S3 (Gateway)
    ├── ECR API (Interface)
    ├── ECR DKR (Interface)
    └── CloudWatch Logs (Interface)
```

> **Reference**: [VPC Endpoints](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html)

### Security Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SECURITY LAYERS                                   │
├─────────────────────────────────────────────────────────────────────────┤
│  CloudFront                                                              │
│  └── SSL/TLS termination, AWS Shield, OAC for S3                        │
├─────────────────────────────────────────────────────────────────────────┤
│  API Gateway                                                             │
│  └── Request validation, CORS, throttling, access logs                  │
├─────────────────────────────────────────────────────────────────────────┤
│  VPC Security Groups                                                     │
│  └── ALB SG ──(8000)──> ECS SG ──(443)──> VPC Endpoints                │
├─────────────────────────────────────────────────────────────────────────┤
│  IAM Roles                                                               │
│  └── ECS Task Role: Only DynamoDB + CloudWatch                          │
│  └── GitHub Actions: Only deploy-related permissions                     │
├─────────────────────────────────────────────────────────────────────────┤
│  Data Encryption                                                         │
│  └── S3: AES-256, DynamoDB: AWS-managed KMS, TLS in transit             │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Terraform Modules Explained

### Module: networking

Creates the foundational network infrastructure.

| Resource | Purpose |
|----------|---------|
| VPC | Isolated network environment |
| Internet Gateway | Allows public subnet internet access |
| NAT Gateway | Allows private subnet outbound internet |
| Public Subnets | Hosts NAT Gateway |
| Private Subnets | Hosts ECS tasks (no public IP) |
| Route Tables | Directs traffic flow |
| VPC Endpoints | Private access to AWS services |
| Security Groups | Firewall rules |

> **Reference**: [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)

### Module: ecs

Manages container orchestration.

| Resource | Purpose |
|----------|---------|
| ECS Cluster | Logical grouping of tasks |
| Task Definition | Container configuration (CPU, memory, image) |
| ECS Service | Maintains desired task count |
| Internal ALB | Load balances across tasks |
| Target Group | Routes ALB traffic to containers |

> **Reference**: [Amazon ECS on Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)

### Module: api-gateway

Exposes the backend API securely.

| Resource | Purpose |
|----------|---------|
| HTTP API | Modern, low-latency API Gateway |
| VPC Link | Private connection to VPC |
| Routes | URL path mappings |
| Stage | Deployment environment |

> **Reference**: [Amazon API Gateway HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)

### Module: cloudfront

Provides global content delivery.

| Resource | Purpose |
|----------|---------|
| Distribution | CDN configuration |
| Origin Access Control | Secure S3 access |
| Cache Behaviors | Caching rules |
| Origins | S3 and API Gateway origins |

> **Reference**: [Amazon CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)

### Module: dynamodb

Manages the database.

| Feature | Configuration |
|---------|---------------|
| Billing | On-demand (pay per request) |
| Encryption | AWS-managed KMS |
| Point-in-Time Recovery | Enabled |
| Deletion Protection | Enabled |

> **Reference**: [Amazon DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)

---

## CI/CD Pipeline

### Workflow Screenshots

| Terraform Pipeline | Backend Deploy | Frontend Deploy |
|:------------------:|:--------------:|:---------------:|
| ![Terraform](docs/cicd_screenshots/terraform_plan_and_apply_success.png) | ![Backend](docs/cicd_screenshots/backend_deploy_succes.png) | ![Frontend](docs/cicd_screenshots/frontend_deploy_success.png) |

### GitHub Actions Workflows

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     GITHUB ACTIONS WORKFLOWS                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  terraform.yml                     backend.yml                           │
│  ├── Trigger: terraform/**        ├── Trigger: backend/**               │
│  ├── Plan on PR                   ├── Build Docker image                │
│  ├── Apply on merge               ├── Push to ECR                       │
│  └── OIDC authentication          └── Update ECS service                │
│                                                                          │
│  frontend.yml                      update-outputs.yml                    │
│  ├── Trigger: frontend/**         ├── Trigger: Manual                   │
│  ├── Build Next.js                ├── Get Terraform outputs             │
│  ├── Deploy to S3                 └── Update README                     │
│  └── Invalidate CloudFront                                              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### OIDC Authentication (No Secrets!)

Instead of storing AWS credentials as GitHub secrets, we use OIDC:

```yaml
permissions:
  id-token: write
  contents: read

- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
    aws-region: us-west-2
```

GitHub provides a JWT token that AWS trusts, eliminating long-lived credentials.

> **Reference**: [GitHub OIDC with AWS](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)

### Required GitHub Secrets

| Secret | Description | How to Get |
|--------|-------------|------------|
| `AWS_ROLE_ARN` | GitHub Actions IAM role | `terraform output github_actions_role_arn` |
| `API_GATEWAY_URL` | API endpoint URL | `terraform output api_gateway_endpoint` |
| `S3_BUCKET_NAME` | Frontend bucket | `terraform output frontend_bucket_name` |
| `CLOUDFRONT_DISTRIBUTION_ID` | CDN distribution | `terraform output cloudfront_distribution_id` |

---

## Security Best Practices

### Implemented Security Controls

| Control | Implementation |
|---------|----------------|
| **Network Isolation** | ECS tasks run in private subnets with no public IP |
| **S3 Security** | Public access blocked, OAC-only access from CloudFront |
| **VPC Endpoints** | Private access to DynamoDB, ECR, S3, CloudWatch |
| **Least Privilege IAM** | Task roles have only required permissions |
| **No Long-Lived Credentials** | GitHub Actions uses OIDC |
| **Encryption at Rest** | S3 (AES-256), DynamoDB (KMS) |
| **Encryption in Transit** | TLS everywhere |
| **Security Group Rules** | Only required ports between components |

> **Reference**: [AWS Security Best Practices](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html)

---

## Monitoring and Observability

### CloudWatch Dashboard

The project includes a pre-configured dashboard with:

- **ECS Metrics**: CPU, Memory, Task Count
- **API Gateway**: Request count, Latency, Errors (4xx, 5xx)
- **DynamoDB**: Read/Write capacity, Throttled requests
- **CloudFront**: Requests, Cache hit ratio

### Container Insights

Detailed container-level metrics:

```
ECS Cluster → Container Insights → Performance Monitoring
├── CPU Utilization per task
├── Memory Utilization per task
├── Network I/O
└── Storage I/O
```

> **Reference**: [CloudWatch Container Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html)

### Alarms (Optional)

Configure alarms for:
- ECS CPU > 80%
- ECS Memory > 80%
- API Gateway 5xx errors > 1%
- DynamoDB throttled requests > 0

---

## AWS Console Screenshots

### VPC Configuration

<details>
<summary>Click to expand VPC Screenshots</summary>

#### VPC Overview
![VPC Overview](docs/aws_screenshots/vpc/vpc-overview.png)
*The main VPC with DNS hostnames and DNS resolution enabled*

#### Subnets
![Subnets](docs/aws_screenshots/vpc/subnets.png)
*Public subnets (for NAT Gateway) and private subnets (for ECS tasks)*

#### Route Tables
![Route Tables](docs/aws_screenshots/vpc/route-tables.png)
*Separate route tables for public (IGW) and private (NAT) subnets*

#### VPC Endpoints
![VPC Endpoints](docs/aws_screenshots/vpc/vpc-endpoints.png)
*Gateway and interface endpoints for private AWS service access*

</details>

### ECS (Elastic Container Service)

<details>
<summary>Click to expand ECS Screenshots</summary>

#### Cluster Overview
![Cluster Overview](docs/aws_screenshots/ecs/cluster-overview.png)
*ECS Cluster with Fargate capacity provider*

#### Service Details
![Service Details](docs/aws_screenshots/ecs/service-details.png)
*ECS Service maintaining desired task count*

#### Running Tasks
![Running Tasks](docs/aws_screenshots/ecs/running-tasks.png)
*Fargate tasks running in private subnets*

#### Task Definition
![Task Definition](docs/aws_screenshots/ecs/task-definition.png)
*Container configuration with CPU, memory, and environment variables*

</details>

### ECR (Elastic Container Registry)

<details>
<summary>Click to expand ECR Screenshots</summary>

#### Repository
![Repository](docs/aws_screenshots/ecr/repository.png)
*Backend container repository with lifecycle policy*

#### Images
![Images](docs/aws_screenshots/ecr/images.png)
*Pushed Docker images with vulnerability scanning results*

</details>

### API Gateway

<details>
<summary>Click to expand API Gateway Screenshots</summary>

#### API Overview
![API Overview](docs/aws_screenshots/api/api-overview.png)
*HTTP API configuration with VPC Link integration*

#### Routes
![Routes](docs/aws_screenshots/api/routes.png)
*API routes mapping to backend ALB*

#### VPC Link
![VPC Link](docs/aws_screenshots/api/vpc-link.png)
*Private connection from API Gateway to VPC*

</details>

### DynamoDB

<details>
<summary>Click to expand DynamoDB Screenshots</summary>

#### Tables
![Tables](docs/aws_screenshots/dynamodb/tables.png)
*Items table with on-demand billing*

#### Table Overview
![Table Overview](docs/aws_screenshots/dynamodb/table-overview.png)
*Table configuration and capacity settings*

#### Sample Items
![Items Sample](docs/aws_screenshots/dynamodb/items-sample.png)
*Sample data in the items table*

</details>

### S3 (Static Hosting)

<details>
<summary>Click to expand S3 Screenshots</summary>

#### Bucket Overview
![Bucket Overview](docs/aws_screenshots/s3/bucket-overview.png)
*Frontend bucket with versioning enabled*

#### Bucket Policy
![Bucket Policy](docs/aws_screenshots/s3/bucket-policy.png)
*OAC policy allowing only CloudFront access*

</details>

### CloudFront

<details>
<summary>Click to expand CloudFront Screenshots</summary>

#### Distribution Overview
![Distribution Overview](docs/aws_screenshots/cloudfront/distribution-overview.png)
*CDN distribution with OAC for S3 origin*

#### Origins
![Origins](docs/aws_screenshots/cloudfront/origins.png)
*S3 origin with Origin Access Control*

</details>

### CloudWatch

<details>
<summary>Click to expand CloudWatch Screenshots</summary>

#### Dashboard
![Dashboard](docs/aws_screenshots/cloudwatch/dashboard.png)
*Monitoring dashboard with key metrics*

#### Log Groups
![Log Groups](docs/aws_screenshots/cloudwatch/log-groups.png)
*ECS and API Gateway log groups*

#### Container Insights
![Container Insights](docs/aws_screenshots/cloudwatch/container-insights.png)
*Detailed container performance metrics*

</details>

### IAM

<details>
<summary>Click to expand IAM Screenshots</summary>

#### Roles Overview
![Roles Overview](docs/aws_screenshots/iam/roles-overview.png)
*IAM roles for ECS tasks and GitHub Actions*

#### GitHub OIDC Provider
![GitHub OIDC](docs/aws_screenshots/iam/github-oidc-provider.png)
*OIDC identity provider for GitHub Actions*

</details>

---

## Cost Considerations

### Monthly Cost Estimate (Dev Environment)

| Service | Cost Factor | Estimated Monthly Cost |
|---------|-------------|----------------------|
| **NAT Gateway** | $0.045/hour + data transfer | ~$32 + data |
| **ECS Fargate** | vCPU + Memory per second | ~$10-30 (low usage) |
| **DynamoDB** | On-demand reads/writes | ~$1-5 (low usage) |
| **CloudFront** | Requests + data transfer | ~$1-5 (low traffic) |
| **API Gateway** | $1/million requests | ~$1 (low traffic) |
| **ALB** | $0.0225/hour + LCU | ~$16 + LCU |
| **VPC Endpoints** | $0.01/hour each | ~$7 per endpoint |
| **S3** | Storage + requests | ~$1 (small site) |

**Total Estimate**: ~$70-100/month for a development environment

### Cost Optimization Tips

1. **Use NAT Instance** instead of NAT Gateway for dev (~$4/month vs $32)
2. **Schedule ECS** to scale to 0 during non-business hours
3. **Remove unused VPC endpoints** (each costs ~$7/month)
4. **Use CloudFront caching** to reduce origin requests

> **Reference**: [AWS Pricing Calculator](https://calculator.aws/)

---

## Troubleshooting

### Common Issues

<details>
<summary>ECS Tasks Keep Stopping</summary>

**Symptoms**: Tasks start then stop immediately

**Check**:
1. CloudWatch Logs for container errors
2. Task definition environment variables
3. Security group allows outbound traffic
4. VPC endpoints are configured correctly

```bash
# View recent logs
aws logs tail /ecs/devops-project-9 --follow
```

</details>

<details>
<summary>API Gateway Returns 502</summary>

**Symptoms**: API requests return "Bad Gateway"

**Check**:
1. ECS tasks are running and healthy
2. VPC Link is active
3. ALB health checks are passing
4. Security groups allow traffic from VPC Link

```bash
# Check ECS service status
aws ecs describe-services --cluster devops-project-9 --services devops-project-9-backend
```

</details>

<details>
<summary>CloudFront Returns 403</summary>

**Symptoms**: Website shows "Access Denied"

**Check**:
1. S3 bucket policy allows CloudFront OAC
2. Objects exist in the bucket
3. Default root object is set (index.html)

```bash
# List bucket contents
aws s3 ls s3://devops-project-9-frontend-123456789012/
```

</details>

<details>
<summary>Docker Push Fails</summary>

**Symptoms**: "no basic auth credentials" or timeout

**Check**:
1. ECR login token is valid (expires after 12 hours)
2. IAM user has ECR permissions
3. Repository exists

```bash
# Re-authenticate to ECR
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-west-2.amazonaws.com
```

</details>

---

## Official Documentation Links

### AWS Services

| Service | Documentation |
|---------|---------------|
| **VPC** | [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/) |
| **ECS Fargate** | [Amazon ECS on Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html) |
| **ECR** | [Amazon ECR User Guide](https://docs.aws.amazon.com/AmazonECR/latest/userguide/) |
| **API Gateway** | [Amazon API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/) |
| **DynamoDB** | [Amazon DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/) |
| **S3** | [Amazon S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/) |
| **CloudFront** | [Amazon CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/) |
| **CloudWatch** | [Amazon CloudWatch User Guide](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/) |
| **IAM** | [AWS IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/) |

### Tools and Frameworks

| Tool | Documentation |
|------|---------------|
| **Terraform** | [Terraform Documentation](https://developer.hashicorp.com/terraform/docs) |
| **AWS Provider** | [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) |
| **Docker** | [Docker Documentation](https://docs.docker.com/) |
| **FastAPI** | [FastAPI Documentation](https://fastapi.tiangolo.com/) |
| **Next.js** | [Next.js Documentation](https://nextjs.org/docs) |
| **GitHub Actions** | [GitHub Actions Documentation](https://docs.github.com/en/actions) |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14, React 18, TailwindCSS | Modern static site with App Router |
| **Backend** | Python 3.11, FastAPI, Uvicorn | High-performance async API |
| **Database** | Amazon DynamoDB | Serverless NoSQL database |
| **Container** | Docker, Amazon ECR | Container packaging and registry |
| **Compute** | Amazon ECS Fargate | Serverless container orchestration |
| **Networking** | Amazon VPC, ALB | Private networking and load balancing |
| **CDN** | Amazon CloudFront | Global content delivery |
| **API** | Amazon API Gateway | Managed API endpoint |
| **IaC** | Terraform | Infrastructure as Code |
| **CI/CD** | GitHub Actions | Automated deployments |
| **Monitoring** | Amazon CloudWatch | Logs, metrics, dashboards |

---

## Infrastructure Cleanup

To completely remove all AWS resources, follow these steps in order. The infrastructure has deletion protection on certain resources, so you must follow this specific sequence.

### Step 1: Remove prevent_destroy from VPC

The VPC module has a `prevent_destroy` lifecycle rule. Edit `terraform/modules/networking/main.tf` and comment out or remove:

```hcl
# Comment out or remove this block from the VPC resource:
lifecycle {
  prevent_destroy = true
}
```

### Step 2: Destroy Main Infrastructure

Destroy all resources managed by the dev environment:

```bash
cd terraform/environments/dev
terraform destroy -auto-approve
```

### Step 3: Empty the S3 State Bucket

S3 buckets must be empty before deletion. Remove all objects including versions:

```bash
# Get your AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Empty the bucket (including all versions)
aws s3api delete-objects --bucket devops-project-9-terraform-state-${AWS_ACCOUNT_ID} \
  --delete "$(aws s3api list-object-versions \
  --bucket devops-project-9-terraform-state-${AWS_ACCOUNT_ID} \
  --query '{Objects: Versions[].{Key:Key,VersionId:VersionId}}' \
  --output json)" 2>/dev/null || true

# Delete any delete markers
aws s3api delete-objects --bucket devops-project-9-terraform-state-${AWS_ACCOUNT_ID} \
  --delete "$(aws s3api list-object-versions \
  --bucket devops-project-9-terraform-state-${AWS_ACCOUNT_ID} \
  --query '{Objects: DeleteMarkers[].{Key:Key,VersionId:VersionId}}' \
  --output json)" 2>/dev/null || true
```

### Step 4: Destroy Bootstrap Resources

Finally, destroy the S3 state bucket and DynamoDB lock table:

```bash
cd terraform/bootstrap
terraform destroy -auto-approve
```

> **Warning**: This will permanently delete your Terraform state. Make sure you have destroyed all infrastructure before this step.

---

## Author

**HimanM** - [GitHub Profile](https://github.com/HimanM)

---

## License

This project is licensed under the MIT License - feel free to use it for learning and reference.

