import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DevOps Project 9 - AWS Architecture Documentation',
  description: 'A learning project demonstrating AWS architecture with S3, CloudFront, API Gateway, ECS, and DynamoDB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}
