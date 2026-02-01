import bcrypt from 'bcryptjs'
import { supabase } from './supabase'

// In production, store this securely
const ADMIN_CREDENTIALS = {
  email: 'amann.khann172@gmail.com',
  password: 'kH@rIz',
}

// Generate hash for password (run once)
export async function generatePasswordHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Admin login function
export async function adminLogin(email: string, password: string) {
  try {
    // For now, verify against hardcoded credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Return admin response
      return {
        success: true,
        admin: {
          email,
          name: 'Aman Khan',
          role: 'admin',
        },
      }
    }

    return {
      success: false,
      error: 'Invalid email or password',
    }
  } catch (error) {
    console.error('Admin login error:', error)
    return {
      success: false,
      error: 'Login failed. Please try again.',
    }
  }
}

// Log admin activity
export async function logAdminActivity(
  adminId: string,
  action: string,
  details?: Record<string, any>,
  ipAddress?: string,
) {
  try {
    if (!supabase) return
    
    await (supabase.from('admin_activity_logs').insert as any)({
      admin_id: adminId,
      action,
      details,
      ip_address: ipAddress,
    })
  } catch (error) {
    console.error('Failed to log admin activity:', error)
  }
}

// Get admin stats
export async function getAdminStats() {
  try {
    if (!supabase) {
      // Return default stats if Supabase not initialized
      return {
        totalUsers: 0,
        totalPosts: 0,
        totalCommunities: 0,
        totalComments: 0,
      }
    }

    const [usersCount, postsCount, communitiesCount, commentsCount] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('posts').select('id', { count: 'exact', head: true }),
      supabase.from('communities').select('id', { count: 'exact', head: true }),
      supabase.from('comments').select('id', { count: 'exact', head: true }),
    ])

    return {
      totalUsers: usersCount.count || 0,
      totalPosts: postsCount.count || 0,
      totalCommunities: communitiesCount.count || 0,
      totalComments: commentsCount.count || 0,
    }
  } catch (error) {
    console.error('Failed to get admin stats:', error)
    return {
      totalUsers: 0,
      totalPosts: 0,
      totalCommunities: 0,
      totalComments: 0,
    }
  }
}

// Get recent activity
export async function getRecentActivity(limit: number = 10) {
  try {
    if (!supabase) return []

    const { data, error } = await supabase
      .from('admin_activity_logs')
      .select('*, admin_users(name, email)')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to get recent activity:', error)
    return []
  }
}
