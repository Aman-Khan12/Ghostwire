'use client'

import Link from 'next/link'
import { Zap, Users, Home, Plus, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700 bg-gradient-to-r from-slate-950 to-slate-900 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <Zap className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-20 group-hover:opacity-30 blur-md transition-opacity" />
            </div>
            <span className="font-bold text-xl text-cyan-400 group-hover:text-cyan-300 transition-colors">
              Ghostwire
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/feed"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-all group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden lg:inline">Feed</span>
            </Link>

            <Link
              href="/communities"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-all group"
            >
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden lg:inline">Communities</span>
            </Link>

            <Link
              href="/create"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 transition-all shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span className="hidden lg:inline">Create</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-700 mt-4">
            <div className="flex flex-col gap-2">
              <Link
                href="/feed"
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-all"
              >
                <Home className="w-5 h-5" />
                Feed
              </Link>
              <Link
                href="/communities"
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-all"
              >
                <Users className="w-5 h-5" />
                Communities
              </Link>
              <Link
                href="/create"
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Post
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
