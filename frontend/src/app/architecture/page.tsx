'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Cloud, Server, Database, Activity, Code, Shield, Lock, Menu, X, Sparkles, Camera } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

export default function ArchitecturePage() {
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
              <Link href="/architecture/" className="nav-link active">Architecture</Link>
              <Link href="/demo/" className="nav-link">Live Demo</Link>
              <Link href="/terraform/" className="nav-link">Terraform</Link>
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
                <Link href="/architecture/" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>Architecture</Link>
                <Link href="/demo/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Live Demo</Link>
                <Link href="/terraform/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Terraform</Link>
                <Link href="/screenshots/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Screenshots</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 animate-slide-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-3">
            <Shield className="h-3 w-3 mr-1" />
            Deep Dive
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Architecture Deep Dive</h1>
        </div>

        {/* Request Flow */}
        <section className="mb-12 animate-slide-up stagger-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Flow</h2>
          <div className="glass rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="space-y-6">
              {[
                { num: 1, color: 'from-blue-400 to-blue-600', title: 'User Request', desc: 'User accesses the website via CloudFront domain (e.g., d1234.cloudfront.net)' },
                { num: 2, color: 'from-orange-400 to-amber-500', title: 'CloudFront CDN', desc: 'CloudFront serves static files from S3 via Origin Access Control (OAC). Files are cached at edge locations globally.' },
                { num: 3, color: 'from-purple-400 to-purple-600', title: 'API Request', desc: 'Frontend makes API calls to API Gateway HTTP API endpoint (e.g., https://abc123.execute-api.us-west-2.amazonaws.com)' },
                { num: 4, color: 'from-emerald-400 to-green-600', title: 'VPC Link', desc: 'API Gateway routes traffic through VPC Link to the internal Application Load Balancer in the private VPC.' },
                { num: 5, color: 'from-blue-500 to-indigo-600', title: 'ECS Fargate', desc: 'Internal ALB forwards to ECS Fargate tasks running the Python FastAPI backend in private subnets.' },
                { num: 6, color: 'from-amber-400 to-yellow-500', title: 'DynamoDB', desc: 'Backend performs CRUD operations on DynamoDB via VPC Endpoint (no internet traversal).' },
              ].map((step, idx) => (
                <div key={idx} className="flex items-start space-x-4 group">
                  <div className={`bg-gradient-to-br ${step.color} text-white rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mb-12 animate-slide-up stagger-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="mr-2 text-emerald-500" /> Security Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Lock, color: 'blue', title: 'Private Backend',
                items: ['ECS tasks run in private subnets with no public IP', 'Internal ALB is not internet-facing', 'Backend only accessible via API Gateway VPC Link', 'Security groups restrict traffic flow']
              },
              {
                icon: Lock, color: 'purple', title: 'S3 + CloudFront',
                items: ['S3 bucket has all public access blocked', 'Origin Access Control (OAC) for CloudFront', 'HTTPS only via CloudFront', 'Custom error pages for SPA routing']
              },
              {
                icon: Lock, color: 'emerald', title: 'VPC Endpoints',
                items: ['DynamoDB Gateway Endpoint (free)', 'S3 Gateway Endpoint (for ECR layers)', 'ECR Interface Endpoints for private image pulls', 'CloudWatch Logs Endpoint']
              },
              {
                icon: Lock, color: 'rose', title: 'IAM Roles',
                items: ['ECS Execution Role - pull images, write logs', 'ECS Task Role - scoped DynamoDB access', 'GitHub Actions OIDC - no long-lived credentials', 'Least privilege principle throughout']
              },
            ].map((card, idx) => (
              <div key={idx} className="glass rounded-2xl p-6 card-hover">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <card.icon className={`mr-2 text-${card.color}-500 h-5 w-5`} /> {card.title}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className={`text-${card.color}-400 mr-2`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Component Details */}
        <section className="mb-12 animate-slide-up stagger-3">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Component Details</h2>
          
          <div className="space-y-6">
            {[
              {
                icon: Cloud, bg: 'from-orange-400 to-amber-500', title: 'Amazon CloudFront', subtitle: 'Content Delivery Network',
                left: { title: 'Configuration', items: ['Origin: S3 bucket with OAC', 'Price Class: PriceClass_100 (US, Canada, Europe)', 'Default root object: index.html', 'Viewer protocol: redirect-to-https'] },
                right: { title: 'SPA Support', items: ['Custom error response for 404 → index.html', 'Custom error response for 403 → index.html', 'Trailing slash enabled'] }
              },
              {
                icon: Server, bg: 'from-purple-400 to-purple-600', title: 'Amazon API Gateway', subtitle: 'HTTP API (v2)',
                left: { title: 'Why HTTP API vs REST API?', items: ['70% cheaper than REST API', 'VPC Link supports ALB directly (no NLB needed)', 'Simpler configuration', 'Lower latency'] },
                right: { title: 'Features Used', items: ['VPC Link integration type', 'CORS configuration', 'Access logging to CloudWatch', 'Auto-deploy stage'] }
              },
              {
                icon: Code, bg: 'from-blue-400 to-blue-600', title: 'Amazon ECS Fargate', subtitle: 'Serverless Container Platform',
                left: { title: 'Task Definition', items: ['CPU: 256 (.25 vCPU)', 'Memory: 512 MB', 'Network mode: awsvpc', 'Container Insights enabled'] },
                right: { title: 'Service Config', items: ['Desired count: 2 tasks', 'Private subnets only', 'No public IP assigned', 'Circuit breaker enabled'] }
              },
              {
                icon: Database, bg: 'from-amber-400 to-yellow-500', title: 'Amazon DynamoDB', subtitle: 'NoSQL Database',
                left: { title: 'Table Design', items: ['Partition Key (PK): ITEM#<uuid>', 'Sort Key (SK): METADATA', 'GSI1: SK as hash, PK as range', 'Billing: PAY_PER_REQUEST (on-demand)'] },
                right: { title: 'Features', items: ['Point-in-time recovery enabled', 'TTL attribute for auto-expiration', 'VPC Endpoint access (no internet)', 'Server-side encryption'] }
              },
            ].map((component, idx) => (
              <div key={idx} className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-br ${component.bg} rounded-xl p-3 mr-4 shadow-lg`}>
                    <component.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{component.title}</h3>
                    <p className="text-gray-500">{component.subtitle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800">{component.left.title}</h4>
                    <ul className="text-gray-600 text-sm space-y-2">
                      {component.left.items.map((item, i) => (
                        <li key={i} className="flex items-start"><span className="text-orange-400 mr-2">•</span>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800">{component.right.title}</h4>
                    <ul className="text-gray-600 text-sm space-y-2">
                      {component.right.items.map((item, i) => (
                        <li key={i} className="flex items-start"><span className="text-orange-400 mr-2">•</span>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
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
                href="https://github.com/HimanM/aws-terraform-secure-fullstack-platform" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <SiGithub className="h-5 w-5" />
                <span className="text-sm">View on GitHub</span>
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
