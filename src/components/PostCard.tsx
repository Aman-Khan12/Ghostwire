'use client'

import { Post, PostInteraction } from '@/types'
import { Zap, MessageCircle, Share2, Repeat2, MapPin, Heart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface PostCardProps {
  post: Post
  interactions?: PostInteraction[]
  onWire?: (postId: string) => void
  onComment?: (postId: string) => void
  onSupport?: (postId: string) => void
  onShare?: (postId: string) => void
}

export function PostCard({
  post,
  interactions = [],
  onWire,
  onComment,
  onSupport,
  onShare,
}: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const wireCount = interactions.filter((i) => i.interaction_type === 'wire').length
  const commentCount = interactions.filter((i) => i.interaction_type === 'comment').length
  const supportCount = interactions.filter((i) => i.interaction_type === 'support').length
  const shareCount = interactions.filter((i) => i.interaction_type === 'share').length

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div
      className="border border-slate-700 rounded-lg bg-slate-900/50 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Post Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-start justify-between">
          <div className="flex gap-3 flex-1">
            {post.user?.avatar_url && (
              <div className="relative w-12 h-12">
                <Image
                  src={post.user.avatar_url}
                  alt={post.user.username}
                  fill
                  className="rounded-full object-cover ring-2 ring-cyan-400/30"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold hover:text-cyan-400 transition-colors">
                {post.user?.username}
              </h3>
              <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
              {post.location && (
                <p className="text-xs text-cyan-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {post.location}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 py-3">
        <p className="text-gray-100 text-sm leading-relaxed">{post.content}</p>
      </div>

      {/* Images Grid */}
      {post.image_urls && post.image_urls.length > 0 && (
        <div
          className={`px-4 py-3 gap-2 grid ${
            post.image_urls.length === 1
              ? 'grid-cols-1'
              : post.image_urls.length === 2
                ? 'grid-cols-2'
                : 'grid-cols-3'
          }`}
        >
          {post.image_urls.map((url, idx) => (
            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={url}
                alt={`Post image ${idx + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      )}

      {/* Interaction Stats */}
      {(wireCount > 0 || commentCount > 0 || supportCount > 0 || shareCount > 0) && (
        <div className="px-4 py-3 border-t border-slate-700/50 text-sm text-gray-400 flex gap-4">
          {wireCount > 0 && (
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-cyan-400" />
              {wireCount}
            </span>
          )}
          {commentCount > 0 && (
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              {commentCount}
            </span>
          )}
          {supportCount > 0 && (
            <span className="flex items-center gap-1">
              <Repeat2 className="w-4 h-4 text-green-400" />
              {supportCount}
            </span>
          )}
          {shareCount > 0 && (
            <span className="flex items-center gap-1">
              <Share2 className="w-4 h-4 text-orange-400" />
              {shareCount}
            </span>
          )}
        </div>
      )}

      {/* Interaction Buttons */}
      <div className="px-4 py-3 border-t border-slate-700/50 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onWire?.(post.id)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all group/btn"
          title="Wire (Like)"
        >
          <Zap className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          <span className="text-sm">Wire</span>
        </button>

        <button
          onClick={() => onComment?.(post.id)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all group/btn"
          title="Comment"
        >
          <MessageCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          <span className="text-sm">Comment</span>
        </button>

        <button
          onClick={() => onSupport?.(post.id)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-400/10 transition-all group/btn"
          title="Support (Repost)"
        >
          <Repeat2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          <span className="text-sm">Support</span>
        </button>

        <button
          onClick={() => onShare?.(post.id)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-orange-400 hover:bg-orange-400/10 transition-all group/btn"
          title="Share"
        >
          <Share2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  )
}
