'use client'

import type { Metadata } from 'next'
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'
import { AdminProvider } from '@/lib/admin-context'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased bg-slate-950`}
      >
        <AdminProvider>
          <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {children}
          </div>
        </AdminProvider>
      </body>
    </html>
  )
}
