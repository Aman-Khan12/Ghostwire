import { NextRequest, NextResponse } from 'next/server'
import { adminLogin, logAdminActivity } from '@/lib/admin'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 },
      )
    }

    const result = await adminLogin(email, password)

    if (result.success && result.admin) {
      // Log the login activity
      const adminId = (result.admin as any).id
      if (adminId) {
        await logAdminActivity(
          adminId,
          'Admin Login',
          { email },
          request.headers.get('x-forwarded-for') || 'unknown',
        )
      }

      return NextResponse.json(
        { success: true, admin: result.admin },
        { status: 200 },
      )
    }

    return NextResponse.json(
      { success: false, error: result.error || 'Login failed' },
      { status: 401 },
    )
  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
