import { supabase } from '../supabase'
import { Post, User, Community, Comment, PostInteraction } from '@/types'

// Posts API
export const postsAPI = {
  // Get all posts
  async getPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*, user:users(*)')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Post[]
  },

  // Get post by ID
  async getPost(id: string) {
    const { data, error } = await supabase.from('posts').select('*, user:users(*)').eq('id', id).single()

    if (error) throw error
    return data as Post
  },

  // Create post
  async createPost(userId: string, content: string, imageUrls: string[] = [], location?: string) {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        user_id: userId,
        content,
        image_urls: imageUrls,
        location,
      })
      .select()
      .single()

    if (error) throw error
    return data as Post
  },

  // Delete post
  async deletePost(id: string) {
    const { error } = await supabase.from('posts').delete().eq('id', id)

    if (error) throw error
  },
}

// Comments API
export const commentsAPI = {
  // Get comments for a post
  async getPostComments(postId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select('*, user:users(*)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data as Comment[]
  },

  // Create comment
  async createComment(postId: string, userId: string, content: string) {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: userId,
        content,
      })
      .select()
      .single()

    if (error) throw error
    return data as Comment
  },

  // Delete comment
  async deleteComment(id: string) {
    const { error } = await supabase.from('comments').delete().eq('id', id)

    if (error) throw error
  },
}

// Post Interactions API
export const interactionsAPI = {
  // Get interactions for a post
  async getPostInteractions(postId: string) {
    const { data, error } = await supabase
      .from('post_interactions')
      .select('*')
      .eq('post_id', postId)

    if (error) throw error
    return data as PostInteraction[]
  },

  // Add interaction
  async addInteraction(postId: string, userId: string, interactionType: 'wire' | 'comment' | 'support' | 'share') {
    const { data, error } = await supabase
      .from('post_interactions')
      .insert({
        post_id: postId,
        user_id: userId,
        interaction_type: interactionType,
      })
      .select()
      .single()

    if (error) throw error
    return data as PostInteraction
  },

  // Remove interaction
  async removeInteraction(postId: string, userId: string, interactionType: string) {
    const { error } = await supabase
      .from('post_interactions')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId)
      .eq('interaction_type', interactionType)

    if (error) throw error
  },
}

// Communities API
export const communitiesAPI = {
  // Get all communities
  async getCommunities() {
    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Community[]
  },

  // Get community by ID
  async getCommunity(id: string) {
    const { data, error } = await supabase.from('communities').select('*').eq('id', id).single()

    if (error) throw error
    return data as Community
  },

  // Create community
  async createCommunity(name: string, description: string, ownerId: string, imageUrl?: string) {
    const { data, error } = await supabase
      .from('communities')
      .insert({
        name,
        description,
        owner_id: ownerId,
        image_url: imageUrl,
      })
      .select()
      .single()

    if (error) throw error
    return data as Community
  },

  // Update community
  async updateCommunity(id: string, updates: Partial<Community>) {
    const { data, error } = await supabase
      .from('communities')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Community
  },

  // Delete community
  async deleteCommunity(id: string) {
    const { error } = await supabase.from('communities').delete().eq('id', id)

    if (error) throw error
  },

  // Join community
  async joinCommunity(communityId: string, userId: string) {
    const { data, error } = await supabase
      .from('community_members')
      .insert({
        community_id: communityId,
        user_id: userId,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Leave community
  async leaveCommunity(communityId: string, userId: string) {
    const { error } = await supabase
      .from('community_members')
      .delete()
      .eq('community_id', communityId)
      .eq('user_id', userId)

    if (error) throw error
  },

  // Get community members
  async getCommunityMembers(communityId: string) {
    const { data, error } = await supabase
      .from('community_members')
      .select('*, user:users(*)')
      .eq('community_id', communityId)

    if (error) throw error
    return data
  },
}

// Users API
export const usersAPI = {
  // Get user by ID
  async getUser(id: string) {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single()

    if (error) throw error
    return data as User
  },

  // Create user
  async createUser(id: string, email: string, username: string) {
    const { data, error } = await supabase
      .from('users')
      .insert({
        id,
        email,
        username,
      })
      .select()
      .single()

    if (error) throw error
    return data as User
  },

  // Update user
  async updateUser(id: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as User
  },
}
