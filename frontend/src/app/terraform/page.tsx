'use client';

import Link from 'next/link';
import { Cloud, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const CodeBlock = ({ title, language, code }: { title: string; language: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
        <span className="text-gray-300 text-sm font-medium">{title}</span>
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-gray-300">{code}</code>
      </pre>
    </div>
  );
};

export default function TerraformPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-aws-dark text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-aws-orange" />
              <span className="text-xl font-bold">DevOps Project 9</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/architecture" className="nav-link">Architecture</Link>
              <Link href="/demo" className="nav-link">Live Demo</Link>
              <Link href="/terraform" className="nav-link active">Terraform</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Terraform Infrastructure</h1>
        <p className="text-gray-600 mb-8">
          Complete Infrastructure as Code with modular Terraform configurations, S3 backend state management, 
          and DynamoDB state locking.
        </p>

        {/* Module Structure */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Module Structure</h2>
          <CodeBlock
            title="Project Structure"
            language="text"
            code={`terraform/
├── bootstrap/                 # State backend (run first)
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── environments/
│   └── dev/                   # Development environment
│       ├── main.tf            # Module calls
│       ├── variables.tf
│       ├── outputs.tf
│       ├── backend.tf         # S3 backend config
│       └── terraform.tfvars
└── modules/
    ├── networking/            # VPC, subnets, security groups
    ├── ecr/                   # Container registry
    ├── ecs/                   # Fargate cluster & service
    ├── dynamodb/              # Items table
    ├── api-gateway/           # HTTP API + VPC Link
    ├── s3-frontend/           # Static hosting bucket
    ├── cloudfront/            # CDN distribution
    ├── cloudwatch/            # Monitoring
    └── iam/                   # Roles & policies`}
          />
        </section>

        {/* Deployment Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Deployment Steps</h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="bg-aws-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Bootstrap State Backend</h3>
                  <p className="text-gray-600 mb-4">Create S3 bucket and DynamoDB table for Terraform state management.</p>
                  <CodeBlock
                    title="Bootstrap Commands"
                    language="bash"
                    code={`cd terraform/bootstrap

# Create terraform.tfvars with your account ID
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your AWS account ID

# Initialize and apply
terraform init
terraform plan
terraform apply`}
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="bg-aws-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Configure Backend</h3>
                  <p className="text-gray-600 mb-4">Update the backend configuration with outputs from bootstrap.</p>
                  <CodeBlock
                    title="terraform/environments/dev/backend.tf"
                    language="hcl"
                    code={`terraform {
  backend "s3" {
    bucket         = "devops-project-9-terraform-state-ACCOUNT_ID"
    key            = "dev/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "devops-project-9-terraform-locks"
  }
}`}
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="bg-aws-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Build & Push Docker Image</h3>
                  <p className="text-gray-600 mb-4">Build the backend container and push to ECR (needed before ECS can start).</p>
                  <CodeBlock
                    title="Build and Push Commands"
                    language="bash"
                    code={`# First, apply just ECR module
cd terraform/environments/dev
terraform init
terraform apply -target=module.ecr

# Get ECR login
aws ecr get-login-password --region us-west-2 | \\
  docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.us-west-2.amazonaws.com

# Build and push
cd ../../../backend
docker build -t devops-project-9-backend .
docker tag devops-project-9-backend:latest \\
  ACCOUNT_ID.dkr.ecr.us-west-2.amazonaws.com/devops-project-9-backend:latest
docker push ACCOUNT_ID.dkr.ecr.us-west-2.amazonaws.com/devops-project-9-backend:latest`}
                  />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="bg-aws-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Deploy Infrastructure</h3>
                  <p className="text-gray-600 mb-4">Apply the complete infrastructure.</p>
                  <CodeBlock
                    title="Deploy Commands"
                    language="bash"
                    code={`cd terraform/environments/dev

# Update terraform.tfvars with your settings
# - github_repo for CI/CD OIDC
# - other customizations

# Apply all infrastructure
terraform plan
terraform apply

# Note the outputs:
# - api_url: API Gateway endpoint
# - frontend_url: CloudFront URL
# - ecr_repository_url: For pushing images
# - github_actions_role_arn: For CI/CD`}
                  />
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="bg-aws-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">5</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Deploy Frontend</h3>
                  <p className="text-gray-600 mb-4">Build and deploy the Next.js static site to S3.</p>
                  <CodeBlock
                    title="Frontend Deployment"
                    language="bash"
                    code={`cd frontend

# Install dependencies
npm install

# Set API URL environment variable
export NEXT_PUBLIC_API_URL="https://YOUR_API_GATEWAY_URL"

# Build static export
npm run build

# Sync to S3
aws s3 sync out/ s3://devops-project-9-frontend-ACCOUNT_ID/ --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \\
  --distribution-id YOUR_DISTRIBUTION_ID \\
  --paths "/*"`}
                  />
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="bg-aws-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">6</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Seed Database (Optional)</h3>
                  <p className="text-gray-600 mb-4">Add sample data to DynamoDB.</p>
                  <CodeBlock
                    title="Seed Database"
                    language="bash"
                    code={`cd backend/seed

# Set environment variables
export AWS_REGION="us-west-2"
export DYNAMODB_TABLE_NAME="devops-project-9-items"

# Run seed script
python seed_db.py`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Module Highlights */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Key Module Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-4">Networking Module</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>✓ VPC with <code className="bg-gray-100 px-1 rounded">prevent_destroy</code> lifecycle</li>
                <li>✓ Public subnets for NAT Gateway</li>
                <li>✓ Private subnets for ECS tasks</li>
                <li>✓ VPC Endpoints for DynamoDB, S3, ECR, CloudWatch</li>
                <li>✓ Security groups with least privilege</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-4">ECS Module</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>✓ Fargate launch type (serverless)</li>
                <li>✓ Container Insights enabled</li>
                <li>✓ Internal ALB (not internet-facing)</li>
                <li>✓ Circuit breaker for deployments</li>
                <li>✓ Health check configuration</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-4">API Gateway Module</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>✓ HTTP API (v2) - cheaper than REST API</li>
                <li>✓ VPC Link to internal ALB</li>
                <li>✓ CORS configuration</li>
                <li>✓ Access logging enabled</li>
                <li>✓ Auto-deploy stage</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-4">IAM Module</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>✓ GitHub Actions OIDC provider</li>
                <li>✓ Scoped permissions per role</li>
                <li>✓ ECS execution role (pull images, logs)</li>
                <li>✓ ECS task role (DynamoDB access only)</li>
                <li>✓ No long-lived credentials</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Important Notes</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Before Destroying Infrastructure</h3>
            <ul className="text-yellow-700 space-y-2">
              <li>• S3 buckets must be emptied before deletion</li>
              <li>• VPC resources have <code className="bg-yellow-100 px-1 rounded">prevent_destroy</code> - remove this lifecycle rule first</li>
              <li>• ECR repository must be emptied of images</li>
              <li>• CloudFront distribution can take 15-30 minutes to delete</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-aws-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            DevOps Project 9 - AWS Architecture Learning Project
          </p>
        </div>
      </footer>
    </div>
  );
}
