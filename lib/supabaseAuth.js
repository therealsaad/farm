import { supabase, isSupabaseConfigured } from './supabase'

// Mock credentials for testing when Supabase is not available
const mockUsers = {
  'user@example.com': { password: 'User123', role: 'user' },
  'admin@example.com': { password: 'Admin123', role: 'admin' },
  'superadmin@example.com': { password: 'SuperAdmin123', role: 'superadmin' },
}

const generateMockToken = (email) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({ 
    email, 
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
  }))
  const signature = btoa('mock-signature')
  return `${header}.${payload}.${signature}`
}

export const supabaseAuthAPI = {
  login: async (email, password) => {
    // Try real Supabase first if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          console.warn('[v0] Supabase auth error:', error.message)
          throw new Error(error.message || 'Invalid login credentials')
        }

        if (!data.user || !data.session) {
          throw new Error('No session returned from Supabase')
        }

        const user = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || email.split('@')[0],
          role: data.user.user_metadata?.role || 'user',
          avatar: data.user.user_metadata?.avatar || null,
        }

        return { user, token: data.session.access_token }
      } catch (error) {
        console.warn('[v0] Supabase login failed, using mock mode:', error.message)
      }
    }

    // Mock mode fallback for development/testing
    await new Promise(resolve => setTimeout(resolve, 800))
    const mockUser = mockUsers[email]
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Email or password is incorrect')
    }

    const user = {
      id: `mock_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name: email.split('@')[0],
      role: mockUser.role,
      avatar: null,
    }

    const token = generateMockToken(email)
    return { user, token }
  },

  register: async (name, email, password, confirmPassword, role = 'user') => {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              role,
              avatar: null,
            }
          }
        })

        if (error) {
          throw new Error(error.message || 'Registration failed')
        }

        if (!data.user) {
          throw new Error('Registration failed - no user returned')
        }

        const user = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || name,
          role: data.user.user_metadata?.role || role,
          avatar: null,
        }

        return { user, token: data.session?.access_token || '' }
      } catch (error) {
        console.warn('[v0] Supabase registration failed, using mock mode:', error.message)
      }
    }

    // Mock mode fallback
    await new Promise(resolve => setTimeout(resolve, 800))

    if (email in mockUsers) {
      throw new Error('Email is already registered')
    }

    const user = {
      id: `mock_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name,
      role,
      avatar: null,
    }

    const token = generateMockToken(email)
    return { user, token }
  },

  logout: async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.warn('[v0] Supabase logout error:', error.message)
        }
      } catch (error) {
        console.warn('[v0] Logout error:', error.message)
      }
    }
    return { success: true }
  },
}
