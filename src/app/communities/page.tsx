'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { CommunityCard } from '@/components/CommunityCard'
import { Community } from '@/types'
import { Plus, Search } from 'lucide-react'

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([
    {
      id: '1',
      name: 'Tech Innovators',
      description: 'Discuss the latest in technology, AI, and innovation',
      image_url: '',
      owner_id: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      member_count: 2345,
    },
    {
      id: '2',
      name: 'Creative Minds',
      description: 'Share your creative works and get feedback from the community',
      image_url: '',
      owner_id: '2',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      member_count: 1892,
    },
    {
      id: '3',
      name: 'Startup Hub',
      description: 'Connect with entrepreneurs and discuss startup ideas',
      image_url: '',
      owner_id: '3',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      member_count: 3421,
    },
    {
      id: '4',
      name: 'Gaming Chronicles',
      description: 'Gaming enthusiasts unite! Share your gameplay and gaming thoughts',
      image_url: '',
      owner_id: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      member_count: 5672,
    },
    {
      id: '5',
      name: 'Fitness & Wellness',
      description: 'Health, fitness tips, and wellness discussions',
      image_url: '',
      owner_id: '2',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      member_count: 4231,
    },
    {
      id: '6',
      name: 'Digital Marketing',
      description: 'Share marketing strategies and discuss digital trends',
      image_url: '',
      owner_id: '3',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      member_count: 2156,
    },
  ])
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>(['1'])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCommunities = communities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleJoin = (communityId: string) => {
    setJoinedCommunities([...joinedCommunities, communityId])
  }

  const handleLeave = (communityId: string) => {
    setJoinedCommunities(joinedCommunities.filter((id) => id !== communityId))
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white">Communities</h1>
                <p className="text-gray-400 mt-2">Join groups and connect with like-minded people</p>
              </div>
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/50 self-start sm:self-auto">
                <Plus className="w-5 h-5" />
                Create Community
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-800/50 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              />
            </div>
          </div>

          {/* Your Communities Section */}
          {joinedCommunities.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Your Communities</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {communities
                  .filter((c) => joinedCommunities.includes(c.id))
                  .map((community) => (
                    <CommunityCard
                      key={community.id}
                      community={community}
                      isMember={true}
                      onJoin={handleJoin}
                      onLeave={handleLeave}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* All Communities Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {searchQuery ? 'Search Results' : 'All Communities'}
              </h2>
              <p className="text-gray-400">{filteredCommunities.length} communities</p>
            </div>

            {filteredCommunities.length === 0 ? (
              <div className="text-center py-12 border border-slate-700 rounded-lg bg-slate-900/50">
                <p className="text-gray-400">No communities found matching your search.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCommunities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    isMember={joinedCommunities.includes(community.id)}
                    onJoin={handleJoin}
                    onLeave={handleLeave}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
