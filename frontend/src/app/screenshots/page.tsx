'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sparkles, ChevronDown, ChevronRight, ZoomIn, XCircle, Globe, Terminal, ExternalLink, User } from 'lucide-react';
import { SiAmazons3, SiAmazoncloudwatch, SiAmazonapigateway, SiAmazonecs, SiAmazondynamodb, SiGithub, SiAmazonwebservices } from 'react-icons/si';
import { FaDocker, FaNetworkWired } from 'react-icons/fa';

// Screenshot categories
const awsScreenshots = [
  {
    category: 'VPC & Networking',
    Icon: FaNetworkWired,
    color: 'cyan',
    images: [
      { src: '/screenshots/aws/vpc/vpc-overview.png', title: 'VPC Overview', desc: 'VPC configuration with CIDR blocks and DNS settings' },
      { src: '/screenshots/aws/vpc/subnets.png', title: 'Subnets', desc: 'Public and private subnets across availability zones' },
      { src: '/screenshots/aws/vpc/route-tables.png', title: 'Route Tables', desc: 'Route table configuration for public and private traffic' },
      { src: '/screenshots/aws/vpc/vpc-endpoints.png', title: 'VPC Endpoints', desc: 'Gateway and interface endpoints for AWS services' },
    ]
  },
  {
    category: 'ECS Fargate',
    Icon: SiAmazonecs,
    color: 'orange',
    images: [
      { src: '/screenshots/aws/ecs/cluster-overview.png', title: 'Cluster Overview', desc: 'ECS cluster with Container Insights enabled' },
      { src: '/screenshots/aws/ecs/service-details.png', title: 'Service Details', desc: 'Service configuration and deployment status' },
      { src: '/screenshots/aws/ecs/task-definition.png', title: 'Task Definition', desc: 'Container definition with CPU/memory allocation' },
      { src: '/screenshots/aws/ecs/running-tasks.png', title: 'Running Tasks', desc: 'Active tasks in private subnets' },
    ]
  },
  {
    category: 'API Gateway',
    Icon: SiAmazonapigateway,
    color: 'purple',
    images: [
      { src: '/screenshots/aws/api/api-overview.png', title: 'API Overview', desc: 'HTTP API configuration and endpoint URL' },
      { src: '/screenshots/aws/api/routes.png', title: 'Routes', desc: 'API routes with VPC Link integration' },
      { src: '/screenshots/aws/api/vpc-link.png', title: 'VPC Link', desc: 'VPC Link connecting to internal ALB' },
    ]
  },
  {
    category: 'DynamoDB',
    Icon: SiAmazondynamodb,
    color: 'blue',
    images: [
      { src: '/screenshots/aws/dynamodb/table-overview.png', title: 'Table Overview', desc: 'DynamoDB table configuration' },
      { src: '/screenshots/aws/dynamodb/tables.png', title: 'Tables', desc: 'DynamoDB tables list' },
      { src: '/screenshots/aws/dynamodb/items-sample.png', title: 'Sample Items', desc: 'Sample data stored in DynamoDB' },
    ]
  },
  {
    category: 'CloudFront',
    Icon: Globe,
    color: 'amber',
    images: [
      { src: '/screenshots/aws/cloudfront/distribution-overview.png', title: 'Distribution', desc: 'CloudFront CDN distribution settings' },
      { src: '/screenshots/aws/cloudfront/origins.png', title: 'Origins', desc: 'S3 origin with Origin Access Control' },
    ]
  },
  {
    category: 'S3',
    Icon: SiAmazons3,
    color: 'green',
    images: [
      { src: '/screenshots/aws/s3/bucket-overview.png', title: 'Bucket Overview', desc: 'S3 bucket for static frontend hosting' },
      { src: '/screenshots/aws/s3/bucket-policy.png', title: 'Bucket Policy', desc: 'CloudFront access policy configuration' },
    ]
  },
  {
    category: 'ECR',
    Icon: FaDocker,
    color: 'indigo',
    images: [
      { src: '/screenshots/aws/ecr/repository.png', title: 'Repository', desc: 'Container image repository' },
      { src: '/screenshots/aws/ecr/images.png', title: 'Images', desc: 'Docker images with tags' },
    ]
  },
  {
    category: 'CloudWatch',
    Icon: SiAmazoncloudwatch,
    color: 'rose',
    images: [
      { src: '/screenshots/aws/cloudwatch/log-groups.png', title: 'Log Groups', desc: 'Centralized logging configuration' },
      { src: '/screenshots/aws/cloudwatch/container-insights.png', title: 'Container Insights', desc: 'ECS monitoring and metrics' },
      { src: '/screenshots/aws/cloudwatch/dashboard.png', title: 'Dashboard', desc: 'Custom monitoring dashboard' },
    ]
  },
  {
    category: 'IAM',
    Icon: User,
    color: 'red',
    images: [
      { src: '/screenshots/aws/iam/github-oidc-provider.png', title: 'OIDC Provider', desc: 'GitHub Actions OIDC identity provider' },
      { src: '/screenshots/aws/iam/roles-overview.png', title: 'IAM Roles', desc: 'ECS and GitHub Actions roles' },
    ]
  },
];

const cliScreenshots = [
  { src: '/screenshots/cli/1_bootstrap_terraform_init.png', title: 'Bootstrap Init', desc: 'Terraform bootstrap initialization', step: 1 },
  { src: '/screenshots/cli/2_bootstrap_terraform_apply_outputs.png', title: 'Bootstrap Apply', desc: 'Bootstrap apply outputs with S3 bucket and DynamoDB table', step: 2 },
  { src: '/screenshots/cli/3_terraform_apply_target_module_ecr.png', title: 'ECR Module', desc: 'Targeted ECR module deployment', step: 3 },
  { src: '/screenshots/cli/4_build_and_push_script.png', title: 'Build & Push', desc: 'Docker build and push to ECR', step: 4 },
  { src: '/screenshots/cli/5_dev_terraform_apply.png', title: 'Full Deploy', desc: 'Complete infrastructure deployment', step: 5 },
  { src: '/screenshots/cli/6_deploy_frontend_script.png', title: 'Frontend Deploy', desc: 'Static site deployment to S3', step: 6 },
  { src: '/screenshots/cli/7_seed_dynamodb_script.png', title: 'Seed Database', desc: 'DynamoDB seed script execution', step: 7 },
];

export default function ScreenshotsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['VPC & Networking']);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const openLightbox = (src: string, title: string) => {
    setLightboxImage({ src, title });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen">
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-orange-400 transition-colors z-10"
            onClick={closeLightbox}
          >
            <XCircle className="h-10 w-10" />
          </button>
          <div className="absolute top-4 left-4 text-white text-lg font-semibold">
            {lightboxImage.title}
          </div>
          <div 
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}

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
              <Link href="/terraform/" className="nav-link">Terraform</Link>
              <Link href="/screenshots/" className="nav-link active">Screenshots</Link>
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
                <Link href="/terraform/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Terraform</Link>
                <Link href="/screenshots/" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>Screenshots</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-10 animate-slide-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-3">
            <ZoomIn className="h-3 w-3 mr-1" />
            Visual Documentation
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Infrastructure Screenshots</h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Complete visual documentation of AWS resources and deployment process. Click any image to view in fullscreen.
          </p>
        </div>

        {/* AWS Console Screenshots */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <SiAmazonwebservices className="h-8 w-8 mr-3 text-[#FF9900]" />
            AWS Console
          </h2>
          
          <div className="space-y-4">
            {awsScreenshots.map((category, idx) => (
              <div key={idx} className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.category)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-${category.color}-100`}>
                      <category.Icon className={`h-6 w-6 text-${category.color}-600`} />
                    </div>
                    <span className="font-bold text-gray-900">{category.category}</span>
                    <span className="text-sm text-gray-500">({category.images.length} images)</span>
                  </div>
                  {expandedCategories.includes(category.category) ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {expandedCategories.includes(category.category) && (
                  <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
                    {category.images.map((img, imgIdx) => (
                      <div 
                        key={imgIdx}
                        className="group cursor-pointer"
                        onClick={() => openLightbox(img.src, img.title)}
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-orange-400 transition-all group-hover:shadow-xl">
                          <Image
                            src={img.src}
                            alt={img.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <div className="flex items-center gap-2 text-white">
                              <ZoomIn className="h-4 w-4" />
                              <span className="text-sm font-medium">Click to enlarge</span>
                            </div>
                          </div>
                        </div>
                        <h4 className="mt-2 font-semibold text-gray-900">{img.title}</h4>
                        <p className="text-sm text-gray-500">{img.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CLI/Deployment Screenshots */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Terminal className="h-8 w-8 mr-3 text-gray-700" />
            Deployment Process
          </h2>
          <p className="text-gray-600 mb-6">Step-by-step CLI screenshots showing the complete deployment workflow.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cliScreenshots.map((img, idx) => (
              <div 
                key={idx}
                className="glass rounded-2xl p-4 group cursor-pointer card-hover"
                onClick={() => openLightbox(img.src, img.title)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-orange-400 to-amber-500 text-white rounded-xl w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
                    {img.step}
                  </div>
                  <h4 className="font-bold text-gray-900">{img.title}</h4>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-orange-400 transition-all">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <div className="flex items-center gap-2 text-white">
                      <ZoomIn className="h-4 w-4" />
                      <span className="text-sm font-medium">Click to enlarge</span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">{img.desc}</p>
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
