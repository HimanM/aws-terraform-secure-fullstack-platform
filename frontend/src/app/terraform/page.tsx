'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Copy, Check, Menu, X, Sparkles, Terminal, Folder, FileCode, AlertTriangle, CheckCircle2, ExternalLink, Trash2 } from 'lucide-react';
import { SiTerraform, SiGithub } from 'react-icons/si';

const CodeBlock = ({ title, language, code }: { title: string; language: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden mb-4 border border-gray-200/50 shadow-lg max-w-full">
      <div className="flex justify-between items-center px-3 py-2 bg-gray-800">
        <span className="text-gray-300 text-xs font-medium flex items-center truncate mr-2">
          <Terminal className="h-3 w-3 mr-1 text-emerald-400 flex-shrink-0" />
          <span className="truncate">{title}</span>
        </span>
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded flex-shrink-0"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <div className="overflow-x-auto bg-gray-900">
        <pre className="p-3 text-[11px] sm:text-xs md:text-sm leading-relaxed">
          <code className="text-gray-300 whitespace-pre block">{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default function TerraformPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Image src="/favicon.png" alt="Logo" width={32} height={32} />
                <Sparkles className="h-3 w-3 text-amber-400 absolute -top-1 -right-1" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">
                DevOps Project 9
              </span>
            </div>
            <div className="hidden md:flex space-x-2">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/architecture/" className="nav-link">Architecture</Link>
              <Link href="/demo/" className="nav-link">Live Demo</Link>
              <Link href="/terraform/" className="nav-link active">Terraform</Link>
              <Link href="/screenshots/" className="nav-link">Screenshots</Link>
            </div>
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-orange-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 animate-slide-up">
              <div className="flex flex-col space-y-2">
                <Link href="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link href="/architecture/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Architecture</Link>
                <Link href="/demo/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Live Demo</Link>
                <Link href="/terraform/" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>Terraform</Link>
                <Link href="/screenshots/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Screenshots</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 animate-slide-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-3">
            <SiTerraform className="h-3 w-3 mr-1" />
            Infrastructure as Code
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Terraform Infrastructure</h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Complete Infrastructure as Code with modular Terraform configurations, S3 backend state management, 
            and DynamoDB state locking.
          </p>
        </div>

        {/* Module Structure */}
        <section className="mb-12 animate-slide-up stagger-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Folder className="mr-2 text-amber-500" /> Module Structure
          </h2>
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
        <section className="mb-12 animate-slide-up stagger-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Terminal className="mr-2 text-emerald-500" /> Deployment Steps
          </h2>
          
          <div className="space-y-6">
            {[
              {
                num: 1, title: 'Bootstrap State Backend',
                desc: 'Create S3 bucket and DynamoDB table for Terraform state management.',
                code: `cd terraform/bootstrap

# Create terraform.tfvars with your account ID
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your AWS account ID

# Initialize and apply
terraform init
terraform plan
terraform apply`
              },
              {
                num: 2, title: 'Configure Backend',
                desc: 'Update the backend configuration with outputs from bootstrap.',
                codeTitle: 'terraform/environments/dev/backend.tf',
                code: `terraform {
  backend "s3" {
    bucket         = "devops-project-9-terraform-state-ACCOUNT_ID"
    key            = "dev/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "devops-project-9-terraform-locks"
  }
}`
              },
              {
                num: 3, title: 'Build & Push Docker Image',
                desc: 'Build the backend container and push to ECR (needed before ECS can start).',
                code: `# First, apply just ECR module
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
docker push ACCOUNT_ID.dkr.ecr.us-west-2.amazonaws.com/devops-project-9-backend:latest`
              },
              {
                num: 4, title: 'Deploy Infrastructure',
                desc: 'Apply the complete infrastructure.',
                code: `cd terraform/environments/dev

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
# - github_actions_role_arn: For CI/CD`
              },
              {
                num: 5, title: 'Deploy Frontend',
                desc: 'Build and deploy the Next.js static site to S3.',
                code: `cd frontend

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
  --paths "/*"`
              },
              {
                num: 6, title: 'Seed Database (Optional)',
                desc: 'Add sample data to DynamoDB.',
                code: `cd backend/seed

# Set environment variables
export AWS_REGION="us-west-2"
export DYNAMODB_TABLE_NAME="devops-project-9-items"

# Run seed script
python seed_db.py`
              },
            ].map((step, idx) => (
              <div key={idx} className="glass rounded-2xl p-4 sm:p-6 card-hover overflow-hidden">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 font-bold shadow-lg text-sm sm:text-base">
                    {step.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">{step.desc}</p>
                    <CodeBlock
                      title={step.codeTitle || 'Commands'}
                      language="bash"
                      code={step.code}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Module Highlights */}
        <section className="mb-12 animate-slide-up stagger-3">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Module Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Networking Module', color: 'blue', items: [
                'VPC with prevent_destroy lifecycle',
                'Public subnets for NAT Gateway',
                'Private subnets for ECS tasks',
                'VPC Endpoints for DynamoDB, S3, ECR, CloudWatch',
                'Security groups with least privilege'
              ]},
              { title: 'ECS Module', color: 'purple', items: [
                'Fargate launch type (serverless)',
                'Container Insights enabled',
                'Internal ALB (not internet-facing)',
                'Circuit breaker for deployments',
                'Health check configuration'
              ]},
              { title: 'API Gateway Module', color: 'emerald', items: [
                'HTTP API (v2) - cheaper than REST API',
                'VPC Link to internal ALB',
                'CORS configuration',
                'Access logging enabled',
                'Auto-deploy stage'
              ]},
              { title: 'IAM Module', color: 'rose', items: [
                'GitHub Actions OIDC provider',
                'Scoped permissions per role',
                'ECS execution role (pull images, logs)',
                'ECS task role (DynamoDB access only)',
                'No long-lived credentials'
              ]},
            ].map((module, idx) => (
              <div key={idx} className="glass rounded-2xl p-6 card-hover">
                <h3 className="font-bold text-lg mb-4 text-gray-900">{module.title}</h3>
                <ul className="text-gray-600 text-sm space-y-2">
                  {module.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className={`h-4 w-4 text-${module.color}-500 mr-2 flex-shrink-0 mt-0.5`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Infrastructure Cleanup */}
        <section className="mb-12 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Trash2 className="h-8 w-8 mr-3 text-red-500" />
            Infrastructure Cleanup
          </h2>
          
          <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-2xl mb-6">
            <h3 className="font-bold text-amber-800 mb-3 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" /> Important: Before Destroying
            </h3>
            <ul className="text-amber-700 space-y-2">
              <li className="flex items-start"><span className="mr-2">•</span>VPC has <code className="bg-amber-100 px-1.5 py-0.5 rounded text-sm">prevent_destroy</code> lifecycle rule - must be removed first</li>
              <li className="flex items-start"><span className="mr-2">•</span>S3 buckets must be emptied before deletion (including versioned objects)</li>
              <li className="flex items-start"><span className="mr-2">•</span>ECR repository must be emptied of images</li>
              <li className="flex items-start"><span className="mr-2">•</span>CloudFront distribution can take 15-30 minutes to delete</li>
            </ul>
          </div>

          <div className="glass rounded-2xl p-6 border-l-4 border-red-500">
            <p className="text-gray-600 mb-4">
              To completely remove all AWS resources, follow these steps in order:
            </p>
            
            <div className="space-y-4">
              <div className="bg-white/50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-2">Step 1: Remove prevent_destroy from VPC</h4>
                <p className="text-sm text-gray-600 mb-2">Edit the VPC module to remove the lifecycle rule:</p>
                <CodeBlock 
                  title="terraform/modules/networking/main.tf" 
                  language="hcl" 
                  code={`# Comment out or remove this block from the VPC resource:\nlifecycle {\n  prevent_destroy = true\n}`}
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-2">Step 2: Destroy Main Infrastructure</h4>
                <p className="text-sm text-gray-600 mb-2">Destroy all resources managed by the dev environment:</p>
                <CodeBlock 
                  title="Terminal" 
                  language="bash" 
                  code={`cd terraform/environments/dev\nterraform destroy -auto-approve`}
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-2">Step 3: Empty the S3 State Bucket</h4>
                <p className="text-sm text-gray-600 mb-2">S3 buckets must be empty before deletion. Remove all versions:</p>
                <CodeBlock 
                  title="Terminal" 
                  language="bash" 
                  code={`# Get your AWS account ID\nAWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)\n\n# Empty the bucket (including all versions)\naws s3api delete-objects --bucket devops-project-9-terraform-state-\${AWS_ACCOUNT_ID} \\\n  --delete "$(aws s3api list-object-versions \\\n  --bucket devops-project-9-terraform-state-\${AWS_ACCOUNT_ID} \\\n  --query '{Objects: Versions[].{Key:Key,VersionId:VersionId}}' \\\n  --output json)" 2>/dev/null || true\n\n# Delete any delete markers\naws s3api delete-objects --bucket devops-project-9-terraform-state-\${AWS_ACCOUNT_ID} \\\n  --delete "$(aws s3api list-object-versions \\\n  --bucket devops-project-9-terraform-state-\${AWS_ACCOUNT_ID} \\\n  --query '{Objects: DeleteMarkers[].{Key:Key,VersionId:VersionId}}' \\\n  --output json)" 2>/dev/null || true`}
                />
              </div>

              <div className="bg-white/50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-2">Step 4: Destroy Bootstrap Resources</h4>
                <p className="text-sm text-gray-600 mb-2">Finally, destroy the S3 state bucket and DynamoDB lock table:</p>
                <CodeBlock 
                  title="Terminal" 
                  language="bash" 
                  code={`cd terraform/bootstrap\nterraform destroy -auto-approve`}
                />
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-800 text-sm">
                  <strong>Warning:</strong> This will permanently delete your Terraform state. Make sure you have destroyed all infrastructure before Step 4.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Image src="/favicon.png" alt="Logo" width={24} height={24} />
              <span className="font-semibold text-gray-700">DevOps Project 9</span>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <a 
                href="https://github.com/HimanM/DevOps-Project-9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <SiGithub className="h-5 w-5" />
                <span className="text-sm">View on GitHub</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <p className="text-gray-500 text-sm">
                By <span className="font-medium text-orange-600">HimanM</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
