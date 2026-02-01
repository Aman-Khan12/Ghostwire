'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/lib/admin-context'
import { getAdminStats, getRecentActivity } from '@/lib/admin'
import { LogOut, Users, FileText, Users2, MessageSquare, Activity, BarChart3, Loader } from 'lucide-react'

interface Stats {
  totalUsers: number
  totalPosts: number
  totalCommunities: number
  totalComments: number
}

interface ActivityItem {
  id: string
  action: string
  timestamp: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const { admin, isAuthenticated, logout, isLoading: authLoading } = useAdmin()
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalPosts: 0,
    totalCommunities: 0,
    totalComments: 0,
  })
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin/login')
      return
    }

    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated, authLoading, router])

  const loadData = async () => {
    try {
      const [statsData, activityData] = await Promise.all([
        getAdminStats(),
        getRecentActivity(),
      ])

      setStats(statsData)
      setRecentActivity(activityData || [])
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Loader className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-cyan-500" />
              <div>
                <h1 className="text-3xl font-bold font-outfit">Admin Dashboard</h1>
                <p className="text-slate-400 text-sm">Welcome back, {admin?.name || admin?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Users Card */}
          <div className="p-6 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500/30 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Users</p>
                <p className="text-4xl font-bold font-outfit">{isLoading ? '-' : stats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-cyan-500" />
            </div>
          </div>

          {/* Posts Card */}
          <div className="p-6 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-orange-500/30 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Posts</p>
                <p className="text-4xl font-bold font-outfit">{isLoading ? '-' : stats.totalPosts}</p>
              </div>
              <FileText className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          {/* Communities Card */}
          <div className="p-6 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-green-500/30 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-1">Communities</p>
                <p className="text-4xl font-bold font-outfit">{isLoading ? '-' : stats.totalCommunities}</p>
              </div>
              <Users2 className="w-8 h-8 text-green-500" />
            </div>
          </div>

          {/* Comments Card */}
          <div className="p-6 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-purple-500/30 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Comments</p>
                <p className="text-4xl font-bold font-outfit">{isLoading ? '-' : stats.totalComments}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="p-6 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-cyan-500" />
            <h2 className="text-xl font-bold font-outfit">Recent Activity</h2>
          </div>

          {recentActivity.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((activity: ActivityItem) => (
                <div key={activity.id} className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-b-0">
                  <span className="text-slate-300">{activity.action}</span>
                  <span className="text-xs text-slate-500">{activity.timestamp}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 p-6 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700">
          <h2 className="text-xl font-bold font-outfit mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded-lg transition-colors font-medium">
              View All Users
            </button>
            <button className="px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 rounded-lg transition-colors font-medium">
              Moderate Posts
            </button>
            <button className="px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-colors font-medium">
              Manage Communities
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
