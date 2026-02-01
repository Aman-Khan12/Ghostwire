export interface User {
  id: string
  email: string
  username: string
  bio?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  user_id: string
  content: string
  image_urls?: string[]
  location?: string
  created_at: string
  updated_at: string
  user?: User
}

export interface Community {
  id: string
  name: string
  description?: string
  image_url?: string
  owner_id: string
  created_at: string
  updated_at: string
  member_count?: number
}

export interface PostInteraction {
  id: string
  post_id: string
  user_id: string
  interaction_type: 'wire' | 'comment' | 'support' | 'share'
  created_at: string
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  user?: User
}

export interface CommunityMember {
  id: string
  community_id: string
  user_id: string
  joined_at: string
}
