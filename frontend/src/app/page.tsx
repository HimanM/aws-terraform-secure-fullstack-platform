'use client';

import Link from 'next/link';
import { Cloud, Server, Database, Globe, Activity, Code } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-aws-dark text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-aws-orange" />
              <span className="text-xl font-bold">DevOps Project 9</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="nav-link active">Home</Link>
              <Link href="/architecture" className="nav-link">Architecture</Link>
              <Link href="/demo" className="nav-link">Live Demo</Link>
              <Link href="/terraform" className="nav-link">Terraform</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-aws-dark to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            AWS Full-Stack Architecture
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            A learning project demonstrating modern cloud architecture with 
            S3, CloudFront, API Gateway, ECS Fargate, DynamoDB, and CloudWatch monitoring.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/architecture"
              className="bg-aws-orange hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View Architecture
            </Link>
            <Link 
              href="/demo"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-aws-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Try Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Architecture Overview
          </h2>
          
          {/* Architecture Diagram */}
          <div className="bg-gray-50 rounded-xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {/* User */}
              <div className="architecture-box border-blue-500 bg-blue-50">
                <Globe className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                <div className="font-semibold">Users</div>
                <div className="text-sm text-gray-500">Internet</div>
              </div>

              {/* Arrow */}
              <div className="text-center text-3xl text-gray-400 hidden md:block">→</div>

              {/* CloudFront + S3 */}
              <div className="architecture-box border-aws-orange bg-orange-50">
                <Cloud className="h-12 w-12 mx-auto mb-2 text-aws-orange" />
                <div className="font-semibold">CloudFront</div>
                <div className="text-sm text-gray-500">CDN + S3 Origin</div>
              </div>

              {/* Arrow */}
              <div className="text-center text-3xl text-gray-400 hidden md:block">→</div>

              {/* API Gateway */}
              <div className="architecture-box border-purple-500 bg-purple-50">
                <Server className="h-12 w-12 mx-auto mb-2 text-purple-500" />
                <div className="font-semibold">API Gateway</div>
                <div className="text-sm text-gray-500">HTTP API</div>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mt-8">
              <div className="col-span-2"></div>
              
              {/* VPC */}
              <div className="col-span-3 border-2 border-dashed border-gray-300 rounded-xl p-6">
                <div className="text-sm text-gray-500 mb-4 font-semibold">Private VPC</div>
                <div className="grid grid-cols-3 gap-4">
                  {/* Internal ALB */}
                  <div className="architecture-box border-green-500 bg-green-50">
                    <Server className="h-10 w-10 mx-auto mb-2 text-green-500" />
                    <div className="font-semibold text-sm">Internal ALB</div>
                  </div>

                  {/* ECS */}
                  <div className="architecture-box border-blue-600 bg-blue-50">
                    <Code className="h-10 w-10 mx-auto mb-2 text-blue-600" />
                    <div className="font-semibold text-sm">ECS Fargate</div>
                    <div className="text-xs text-gray-500">Python API</div>
                  </div>

                  {/* DynamoDB */}
                  <div className="architecture-box border-yellow-600 bg-yellow-50">
                    <Database className="h-10 w-10 mx-auto mb-2 text-yellow-600" />
                    <div className="font-semibold text-sm">DynamoDB</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitoring */}
            <div className="mt-8 flex justify-center">
              <div className="architecture-box border-red-500 bg-red-50 w-64">
                <Activity className="h-10 w-10 mx-auto mb-2 text-red-500" />
                <div className="font-semibold">CloudWatch</div>
                <div className="text-sm text-gray-500">Logs, Metrics, Alarms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="bg-aws-orange/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-aws-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Static Frontend</h3>
              <p className="text-gray-600">
                Next.js static site hosted on S3 with CloudFront CDN for global distribution 
                and low latency. Origin Access Control ensures secure access.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Server className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Private Backend</h3>
              <p className="text-gray-600">
                ECS Fargate runs in private subnets with no public IP. API Gateway 
                connects via VPC Link ensuring the backend is never directly exposed.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Infrastructure as Code</h3>
              <p className="text-gray-600">
                Entire infrastructure defined in Terraform modules with S3 backend 
                and DynamoDB state locking. GitHub Actions for CI/CD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Technology Stack
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Amazon S3', desc: 'Static hosting' },
              { name: 'CloudFront', desc: 'CDN' },
              { name: 'API Gateway', desc: 'HTTP API' },
              { name: 'ECS Fargate', desc: 'Containers' },
              { name: 'DynamoDB', desc: 'NoSQL Database' },
              { name: 'CloudWatch', desc: 'Monitoring' },
              { name: 'ECR', desc: 'Container Registry' },
              { name: 'VPC', desc: 'Networking' },
              { name: 'Terraform', desc: 'IaC' },
              { name: 'GitHub Actions', desc: 'CI/CD' },
              { name: 'Next.js', desc: 'Frontend' },
              { name: 'FastAPI', desc: 'Backend' },
            ].map((tech, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="font-semibold text-gray-800">{tech.name}</div>
                <div className="text-sm text-gray-500">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-aws-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            DevOps Project 9 - AWS Architecture Learning Project
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built with Next.js, FastAPI, Terraform, and AWS Services
          </p>
        </div>
      </footer>
    </div>
  );
}
