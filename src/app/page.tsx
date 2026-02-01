'use client'

import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Zap, Users, Share2, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-8 slide-in-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-cyan-400">Welcome to the Future</span>
                  </div>

                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                    <span className="text-white">Connect. Share.</span>
                    <br />
                    <span className="gradient-text">Amplify Your Voice</span>
                  </h1>

                  <p className="text-lg text-gray-400 max-w-lg">
                    Ghostwire is a next-generation social platform designed for the modern creator. Wire
                    moments, amplify conversations, and build communities that matter.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/feed"
                    className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold hover:from-cyan-400 hover:to-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/50"
                  >
                    <Zap className="w-5 h-5" />
                    Enter Ghostwire
                  </Link>
                  <Link
                    href="/communities"
                    className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg border border-cyan-400/30 text-cyan-400 font-semibold hover:bg-cyan-400/10 transition-all"
                  >
                    <Users className="w-5 h-5" />
                    Explore Communities
                  </Link>
                </div>
              </div>

              {/* Right Visual */}
              <div className="hidden lg:block slide-in-right">
                <div className="relative w-full aspect-square">
                  {/* Animated Background Grid */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-orange-400/10 rounded-2xl border border-cyan-400/20" />

                  {/* Floating Cards */}
                  <div className="absolute top-8 right-8 p-4 rounded-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm max-w-xs animate-pulse">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-semibold text-white">Wire Activity</span>
                    </div>
                    <p className="text-xs text-gray-400">5.2K wires this hour</p>
                  </div>

                  <div className="absolute bottom-8 left-8 p-4 rounded-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm max-w-xs animate-pulse" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-semibold text-white">Communities</span>
                    </div>
                    <p className="text-xs text-gray-400">1.2K active groups</p>
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 blur-3xl opacity-20 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative px-4 py-20 sm:px-6 lg:px-8 border-t border-slate-700/50">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
                Core Features
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Everything you need to connect, create, and grow your influence
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Feature Cards */}
              {[
                {
                  icon: Zap,
                  title: 'Wire (Like)',
                  description: 'Quick reactions powered by energy',
                  color: 'cyan',
                },
                {
                  icon: Users,
                  title: 'Communities',
                  description: 'Build and manage groups with shared interests',
                  color: 'blue',
                },
                {
                  icon: Share2,
                  title: 'Share & Support',
                  description: 'Amplify posts and repost to your network',
                  color: 'orange',
                },
                {
                  icon: Sparkles,
                  title: 'Create',
                  description: 'Share images, captions, and location tags',
                  color: 'cyan',
                },
              ].map((feature, idx) => {
                const Icon = feature.icon
                const colorClasses = {
                  cyan: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20',
                  blue: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
                  orange: 'bg-orange-400/10 text-orange-400 border-orange-400/20',
                }

                return (
                  <div
                    key={idx}
                    className="p-6 rounded-lg border border-slate-700 bg-slate-900/50 hover:border-cyan-400/30 transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="p-12 rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 via-slate-900/50 to-orange-400/10 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to make your mark?</h2>
              <p className="text-lg text-gray-400 mb-8">
                Join Ghostwire today and start connecting with your community
              </p>
              <Link
                href="/feed"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold hover:from-cyan-400 hover:to-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/50"
              >
                <Zap className="w-5 h-5" />
                Get Started Now
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
