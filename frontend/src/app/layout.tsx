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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/40 min-h-screen antialiased">
        {/* Decorative background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-yellow-200/25 rounded-full blur-3xl" />
        </div>
        {children}
      </body>
    </html>
  )
}
