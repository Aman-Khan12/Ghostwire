'use client'

import { Community } from '@/types'
import { Users, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CommunityCardProps {
  community: Community
  isMember?: boolean
  onJoin?: (communityId: string) => void
  onLeave?: (communityId: string) => void
}

export function CommunityCard({
  community,
  isMember = false,
  onJoin,
  onLeave,
}: CommunityCardProps) {
  return (
    <div className="border border-slate-700 rounded-lg bg-slate-900/50 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300 overflow-hidden group">
      {/* Community Image */}
      {community.image_url ? (
        <div className="relative h-32 w-full">
          <Image
            src={community.image_url}
            alt={community.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
        </div>
      ) : (
        <div className="h-32 w-full bg-gradient-to-r from-cyan-600 to-cyan-800 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Users className="w-16 h-16" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <Link href={`/community/${community.id}`}>
            <h3 className="text-lg font-bold text-white hover:text-cyan-400 transition-colors">
              {community.name}
            </h3>
          </Link>
          {community.description && (
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{community.description}</p>
          )}
        </div>

        {/* Member Count */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users className="w-4 h-4 text-cyan-400" />
          <span>{community.member_count || 0} members</span>
        </div>

        {/* Join/Leave Button */}
        <button
          onClick={() => (isMember ? onLeave?.(community.id) : onJoin?.(community.id))}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
            isMember
              ? 'bg-slate-800/50 text-gray-300 border border-slate-600 hover:bg-slate-800 hover:text-red-400 hover:border-red-400/30'
              : 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 shadow-lg hover:shadow-cyan-500/50'
          }`}
        >
          <Plus className="w-4 h-4" />
          {isMember ? 'Leave' : 'Join'}
        </button>
      </div>
    </div>
  )
}
