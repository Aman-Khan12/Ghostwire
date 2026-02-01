'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { PostCard } from '@/components/PostCard'
import { CreatePostModal } from '@/components/CreatePostModal'
import { Post, PostInteraction } from '@/types'
import { Plus, Loader } from 'lucide-react'

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [interactions, setInteractions] = useState<PostInteraction[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load demo posts
    loadDemoPosts()
  }, [])

  const loadDemoPosts = () => {
    // Demo posts
    const demoPosts: Post[] = [
      {
        id: '1',
        user_id: '1',
        content: 'Just launched Ghostwire! 🚀 Excited to build the future of social media with you all!',
        image_urls: [],
        location: 'San Francisco, CA',
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        user: {
          id: '1',
          email: 'founder@ghostwire.com',
          username: 'founder',
          bio: 'Building the future of social',
          avatar_url: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
      {
        id: '2',
        user_id: '2',
        content:
          "First post on Ghostwire! Love the futuristic design and the community vibe here. Can't wait to see where this goes!",
        image_urls: [],
        location: 'New York, NY',
        created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        user: {
          id: '2',
          email: 'user@ghostwire.com',
          username: 'creator',
          bio: 'Content creator & tech enthusiast',
          avatar_url: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
      {
        id: '3',
        user_id: '3',
        content: 'The communities feature is game-changing! Just created a tech discussion group. Join us! 👨‍💻',
        image_urls: [],
        location: 'Austin, TX',
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        user: {
          id: '3',
          email: 'dev@ghostwire.com',
          username: 'developer',
          bio: 'Full-stack developer passionate about building',
          avatar_url: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
    ]

    const demoInteractions: PostInteraction[] = [
      {
        id: '1',
        post_id: '1',
        user_id: '2',
        interaction_type: 'wire',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        post_id: '1',
        user_id: '3',
        interaction_type: 'wire',
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        post_id: '1',
        user_id: '2',
        interaction_type: 'comment',
        created_at: new Date().toISOString(),
      },
      {
        id: '4',
        post_id: '2',
        user_id: '1',
        interaction_type: 'wire',
        created_at: new Date().toISOString(),
      },
      {
        id: '5',
        post_id: '3',
        user_id: '1',
        interaction_type: 'support',
        created_at: new Date().toISOString(),
      },
    ]

    setPosts(demoPosts)
    setInteractions(demoInteractions)
    setIsLoading(false)
  }

  const handleCreatePost = async (content: string, images: File[], location?: string) => {
    // Simulate API call
    const newPost: Post = {
      id: String(Date.now()),
      user_id: '1',
      content,
      image_urls: [],
      location,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user: {
        id: '1',
        email: 'user@ghostwire.com',
        username: 'yourname',
        bio: 'Your bio',
        avatar_url: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    }

    setPosts([newPost, ...posts])
  }

  const handleWire = (postId: string) => {
    // Add wire interaction
    const newInteraction: PostInteraction = {
      id: String(Date.now()),
      post_id: postId,
      user_id: '1',
      interaction_type: 'wire',
      created_at: new Date().toISOString(),
    }

    setInteractions([...interactions, newInteraction])
  }

  const handleComment = (postId: string) => {
    // In a real app, this would open a comment modal
    alert('Comment modal would open for post: ' + postId)
  }

  const handleSupport = (postId: string) => {
    // Add support interaction
    const newInteraction: PostInteraction = {
      id: String(Date.now()),
      post_id: postId,
      user_id: '1',
      interaction_type: 'support',
      created_at: new Date().toISOString(),
    }

    setInteractions([...interactions, newInteraction])
  }

  const handleShare = (postId: string) => {
    // Copy post link to clipboard
    const url = `${window.location.origin}/post/${postId}`
    navigator.clipboard.writeText(url)
    alert('Post link copied to clipboard!')
  }

  const getPostInteractions = (postId: string) => {
    return interactions.filter((i) => i.post_id === postId)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Feed Title */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Feed</h1>
              <p className="text-gray-400 mt-2">Stay updated with your network</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/50"
            >
              <Plus className="w-5 h-5" />
              Create
            </button>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
          ) : (
            <>
              {/* Posts Feed */}
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <div className="text-center py-12 border border-slate-700 rounded-lg bg-slate-900/50">
                    <p className="text-gray-400">No posts yet. Be the first to share!</p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      interactions={getPostInteractions(post.id)}
                      onWire={handleWire}
                      onComment={handleComment}
                      onSupport={handleSupport}
                      onShare={handleShare}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </>
  )
}
