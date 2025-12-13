'use client';

import Link from 'next/link';
import { Cloud, Server, Database, Globe, Activity, Code, ArrowRight, Sparkles, Shield, Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 animate-slide-in-left">
              <div className="relative">
                <Cloud className="h-8 w-8 text-orange-500 animate-float" />
                <Sparkles className="h-3 w-3 text-amber-400 absolute -top-1 -right-1" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">
                DevOps Project 9
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-2 animate-slide-in-right">
              <Link href="/" className="nav-link active">Home</Link>
              <Link href="/architecture" className="nav-link">Architecture</Link>
              <Link href="/demo" className="nav-link">Live Demo</Link>
              <Link href="/terraform" className="nav-link">Terraform</Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-orange-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 animate-slide-up">
              <div className="flex flex-col space-y-2">
                <Link href="/" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link href="/architecture" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Architecture</Link>
                <Link href="/demo" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Live Demo</Link>
                <Link href="/terraform" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Terraform</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6 animate-bounce-in">
              <Sparkles className="h-4 w-4 mr-2" />
              Learning AWS Architecture
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-slide-up">
              <span className="text-gray-900">AWS Full-Stack</span>
              <br />
              <span className="gradient-text">Architecture</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-slide-up stagger-2">
              A hands-on project demonstrating modern cloud patterns with 
              S3, CloudFront, API Gateway, ECS Fargate, DynamoDB, and comprehensive monitoring.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up stagger-3">
              <Link href="/architecture" className="btn-primary inline-flex items-center justify-center group">
                View Architecture
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/demo" className="btn-secondary inline-flex items-center justify-center">
                Try Live Demo
              </Link>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200/50 blob animate-float hidden lg:block" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-200/50 blob animate-float stagger-3 hidden lg:block" />
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Architecture Overview
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A secure, scalable architecture with private backend services
            </p>
          </div>
          
          {/* Architecture Diagram */}
          <div className="glass rounded-3xl p-6 md:p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 items-center">
              {/* User */}
              <div className="architecture-box border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 card-hover animate-slide-up">
                <Globe className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-2 text-blue-500" />
                <div className="font-bold text-gray-800">Users</div>
                <div className="text-sm text-gray-500">Internet</div>
              </div>

              {/* Arrow */}
              <div className="text-center text-2xl md:text-3xl text-orange-400 hidden md:block animate-pulse">→</div>
              <div className="text-center text-2xl text-orange-400 md:hidden">↓</div>

              {/* CloudFront + S3 */}
              <div className="architecture-box border-orange-400 bg-gradient-to-br from-orange-50 to-amber-100 card-hover animate-slide-up stagger-1">
                <Cloud className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-2 text-orange-500" />
                <div className="font-bold text-gray-800">CloudFront</div>
                <div className="text-sm text-gray-500">CDN + S3 Origin</div>
              </div>

              {/* Arrow */}
              <div className="text-center text-2xl md:text-3xl text-orange-400 hidden md:block animate-pulse">→</div>
              <div className="text-center text-2xl text-orange-400 md:hidden">↓</div>

              {/* API Gateway */}
              <div className="architecture-box border-purple-400 bg-gradient-to-br from-purple-50 to-purple-100 card-hover animate-slide-up stagger-2">
                <Server className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-2 text-purple-500" />
                <div className="font-bold text-gray-800">API Gateway</div>
                <div className="text-sm text-gray-500">HTTP API</div>
              </div>
            </div>

            {/* Arrow down */}
            <div className="text-center text-2xl text-orange-400 my-6 animate-pulse">↓</div>

            {/* Private VPC Section */}
            <div className="relative border-2 border-dashed border-orange-300 rounded-2xl p-6 bg-gradient-to-br from-white/50 to-orange-50/30">
              <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold rounded-full">
                🔒 Private VPC
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4">
                {/* Internal ALB */}
                <div className="architecture-box border-emerald-400 bg-gradient-to-br from-emerald-50 to-emerald-100 card-hover animate-slide-up stagger-3">
                  <Server className="h-9 md:h-10 w-9 md:w-10 mx-auto mb-2 text-emerald-500" />
                  <div className="font-bold text-gray-800 text-sm md:text-base">Internal ALB</div>
                  <div className="text-xs text-gray-500">VPC Link</div>
                </div>

                {/* ECS */}
                <div className="architecture-box border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 card-hover animate-slide-up stagger-4 animate-pulse-glow">
                  <Code className="h-9 md:h-10 w-9 md:w-10 mx-auto mb-2 text-blue-600" />
                  <div className="font-bold text-gray-800 text-sm md:text-base">ECS Fargate</div>
                  <div className="text-xs text-gray-500">Python FastAPI</div>
                </div>

                {/* DynamoDB */}
                <div className="architecture-box border-amber-500 bg-gradient-to-br from-amber-50 to-yellow-100 card-hover animate-slide-up stagger-5">
                  <Database className="h-9 md:h-10 w-9 md:w-10 mx-auto mb-2 text-amber-600" />
                  <div className="font-bold text-gray-800 text-sm md:text-base">DynamoDB</div>
                  <div className="text-xs text-gray-500">VPC Endpoint</div>
                </div>
              </div>
            </div>

            {/* Monitoring */}
            <div className="mt-8 flex justify-center">
              <div className="architecture-box border-rose-400 bg-gradient-to-br from-rose-50 to-pink-100 w-full md:w-72 card-hover animate-slide-up stagger-6">
                <Activity className="h-9 md:h-10 w-9 md:w-10 mx-auto mb-2 text-rose-500" />
                <div className="font-bold text-gray-800">CloudWatch</div>
                <div className="text-sm text-gray-500">Logs, Metrics, Alarms, Dashboard</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with security, scalability, and best practices in mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="glass rounded-2xl p-6 md:p-8 card-hover group">
              <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Globe className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Static Frontend</h3>
              <p className="text-gray-600">
                Next.js static site hosted on S3 with CloudFront CDN for global distribution 
                and sub-50ms latency. Origin Access Control ensures secure access.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 md:p-8 card-hover group">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Private Backend</h3>
              <p className="text-gray-600">
                ECS Fargate runs in private subnets with no public IP. API Gateway 
                connects via VPC Link ensuring the backend is never directly exposed.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 md:p-8 card-hover group">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Code className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Infrastructure as Code</h3>
              <p className="text-gray-600">
                Entire infrastructure defined in modular Terraform with S3 backend 
                state management. GitHub Actions OIDC for secure CI/CD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technology Stack
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'Amazon S3', desc: 'Static hosting', emoji: '📦' },
              { name: 'CloudFront', desc: 'CDN', emoji: '🌐' },
              { name: 'API Gateway', desc: 'HTTP API', emoji: '🔌' },
              { name: 'ECS Fargate', desc: 'Containers', emoji: '🐳' },
              { name: 'DynamoDB', desc: 'NoSQL Database', emoji: '🗄️' },
              { name: 'CloudWatch', desc: 'Monitoring', emoji: '📊' },
              { name: 'ECR', desc: 'Container Registry', emoji: '📋' },
              { name: 'VPC', desc: 'Networking', emoji: '🔒' },
              { name: 'Terraform', desc: 'IaC', emoji: '🏗️' },
              { name: 'GitHub Actions', desc: 'CI/CD', emoji: '⚡' },
              { name: 'Next.js', desc: 'Frontend', emoji: '⚛️' },
              { name: 'FastAPI', desc: 'Backend', emoji: '🐍' },
            ].map((tech, idx) => (
              <div 
                key={idx} 
                className="glass rounded-xl p-4 text-center card-hover group"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="text-2xl mb-2 group-hover:scale-125 transition-transform">{tech.emoji}</div>
                <div className="font-bold text-gray-800">{tech.name}</div>
                <div className="text-sm text-gray-500">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10" />
            <div className="relative">
              <Zap className="h-12 w-12 text-orange-500 mx-auto mb-6 animate-pulse" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Ready to explore?
              </h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Dive deep into the architecture, try the live CRUD demo, or explore the Terraform code.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/architecture" className="btn-primary">
                  Deep Dive Architecture
                </Link>
                <Link href="/demo" className="btn-secondary">
                  Try the API
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Cloud className="h-6 w-6 text-orange-500" />
              <span className="font-semibold text-gray-700">DevOps Project 9</span>
            </div>
            <p className="text-gray-500 text-sm text-center md:text-right">
              Built with Next.js, FastAPI, Terraform & AWS
              <br className="md:hidden" />
              <span className="hidden md:inline"> • </span>
              A learning project for cloud architecture
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
