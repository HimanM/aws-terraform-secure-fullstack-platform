'use client';

import Link from 'next/link';
import { Cloud, Server, Database, Globe, Activity, Code, Shield, ArrowRight, Lock } from 'lucide-react';

export default function ArchitecturePage() {
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
              <Link href="/architecture" className="nav-link active">Architecture</Link>
              <Link href="/demo" className="nav-link">Live Demo</Link>
              <Link href="/terraform" className="nav-link">Terraform</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Architecture Deep Dive</h1>

        {/* Request Flow */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Request Flow</h2>
          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-lg">User Request</h3>
                  <p className="text-gray-600">User accesses the website via CloudFront domain (e.g., d1234.cloudfront.net)</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-4">
                <div className="bg-aws-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-lg">CloudFront CDN</h3>
                  <p className="text-gray-600">CloudFront serves static files from S3 via Origin Access Control (OAC). Files are cached at edge locations globally.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-lg">API Request</h3>
                  <p className="text-gray-600">Frontend makes API calls to API Gateway HTTP API endpoint (e.g., https://abc123.execute-api.us-west-2.amazonaws.com)</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-lg">VPC Link</h3>
                  <p className="text-gray-600">API Gateway routes traffic through VPC Link to the internal Application Load Balancer in the private VPC.</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">5</div>
                <div>
                  <h3 className="font-semibold text-lg">ECS Fargate</h3>
                  <p className="text-gray-600">Internal ALB forwards to ECS Fargate tasks running the Python FastAPI backend in private subnets.</p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">6</div>
                <div>
                  <h3 className="font-semibold text-lg">DynamoDB</h3>
                  <p className="text-gray-600">Backend performs CRUD operations on DynamoDB via VPC Endpoint (no internet traversal).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Shield className="mr-2 text-green-600" /> Security Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Lock className="mr-2 text-blue-500 h-5 w-5" /> Private Backend
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• ECS tasks run in <strong>private subnets</strong> with no public IP</li>
                <li>• Internal ALB is not internet-facing</li>
                <li>• Backend only accessible via API Gateway VPC Link</li>
                <li>• Security groups restrict traffic flow</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Lock className="mr-2 text-purple-500 h-5 w-5" /> S3 + CloudFront
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• S3 bucket has <strong>all public access blocked</strong></li>
                <li>• Origin Access Control (OAC) for CloudFront</li>
                <li>• HTTPS only via CloudFront</li>
                <li>• Custom error pages for SPA routing</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Lock className="mr-2 text-green-500 h-5 w-5" /> VPC Endpoints
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• DynamoDB Gateway Endpoint (free)</li>
                <li>• S3 Gateway Endpoint (for ECR layers)</li>
                <li>• ECR Interface Endpoints for private image pulls</li>
                <li>• CloudWatch Logs Endpoint</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Lock className="mr-2 text-red-500 h-5 w-5" /> IAM Roles
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• ECS Execution Role - pull images, write logs</li>
                <li>• ECS Task Role - scoped DynamoDB access</li>
                <li>• GitHub Actions OIDC - no long-lived credentials</li>
                <li>• Least privilege principle throughout</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Component Details */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Component Details</h2>
          
          <div className="space-y-6">
            {/* CloudFront */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-aws-orange/10 rounded-lg p-3 mr-4">
                  <Cloud className="h-8 w-8 text-aws-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Amazon CloudFront</h3>
                  <p className="text-gray-500">Content Delivery Network</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Configuration</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Origin: S3 bucket with OAC</li>
                    <li>• Price Class: PriceClass_100 (US, Canada, Europe)</li>
                    <li>• Default root object: index.html</li>
                    <li>• Viewer protocol: redirect-to-https</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">SPA Support</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Custom error response for 404 → index.html</li>
                    <li>• Custom error response for 403 → index.html</li>
                    <li>• Trailing slash enabled</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* API Gateway */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-lg p-3 mr-4">
                  <Server className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Amazon API Gateway</h3>
                  <p className="text-gray-500">HTTP API (v2)</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Why HTTP API vs REST API?</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• 70% cheaper than REST API</li>
                    <li>• VPC Link supports ALB directly (no NLB needed)</li>
                    <li>• Simpler configuration</li>
                    <li>• Lower latency</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Features Used</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• VPC Link integration type</li>
                    <li>• CORS configuration</li>
                    <li>• Access logging to CloudWatch</li>
                    <li>• Auto-deploy stage</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ECS */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Amazon ECS Fargate</h3>
                  <p className="text-gray-500">Serverless Container Platform</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Task Definition</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• CPU: 256 (.25 vCPU)</li>
                    <li>• Memory: 512 MB</li>
                    <li>• Network mode: awsvpc</li>
                    <li>• Container Insights enabled</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Service Config</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Desired count: 2 tasks</li>
                    <li>• Private subnets only</li>
                    <li>• No public IP assigned</li>
                    <li>• Circuit breaker enabled</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* DynamoDB */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 rounded-lg p-3 mr-4">
                  <Database className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Amazon DynamoDB</h3>
                  <p className="text-gray-500">NoSQL Database</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Table Design</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Partition Key (PK): ITEM#&lt;uuid&gt;</li>
                    <li>• Sort Key (SK): METADATA</li>
                    <li>• GSI1: SK as hash, PK as range</li>
                    <li>• Billing: PAY_PER_REQUEST (on-demand)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Features</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Point-in-time recovery enabled</li>
                    <li>• TTL attribute for auto-expiration</li>
                    <li>• VPC Endpoint access (no internet)</li>
                    <li>• Server-side encryption</li>
                  </ul>
                </div>
              </div>
            </div>
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
