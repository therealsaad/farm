import { supabase, isSupabaseConfigured } from './supabase'

// Mock user profiles for development mode
const mockProfiles = {
  'user@example.com': {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  'admin@example.com': {
    id: '2',
    firstName: 'Jane',
    lastName: 'Admin',
    email: 'admin@example.com',
    phone: '+91 98765 43211',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  'priya@example.com': {
    id: '3',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43212',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
  }
}

export const userProfilesDB = {
  // Fetch user profile from Supabase or mock
  fetchProfile: async (userId, userEmail) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (error && error.code === 'PGRST116') {
          // Profile doesn't exist, create default one
          const firstName = userEmail?.split('@')[0] || 'User'
          const defaultProfile = {
            id: userId,
            firstName,
            lastName: '',
            email: userEmail,
            phone: '',
            avatar: null
          }
          
          const { data: created, error: createError } = await supabase
            .from('profiles')
            .insert([defaultProfile])
            .select()
            .single()

          if (createError) throw createError
          return created
        }

        if (error) throw error
        return data
      } else {
        // Mock mode - return profile based on email
        return mockProfiles[userEmail] || {
          id: userId,
          firstName: userEmail?.split('@')[0] || 'User',
          lastName: '',
          email: userEmail,
          phone: '',
          avatar: null
        }
      }
      } catch (error) {
        console.warn('[v0] Error fetching profile:', error.message)
        // Return minimal default profile on error
        return {
        id: userId,
        firstName: userEmail?.split('@')[0] || 'User',
        lastName: '',
        email: userEmail,
        phone: '',
        avatar: null
      }
    }
  },

  // Update user profile
  updateProfile: async (userId, updates) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', userId)
          .select()
          .single()

        if (error) throw error
        return { success: true, data }
      } else {
        // Mock mode
        return { success: true, data: { id: userId, ...updates } }
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      return { success: false, error: error.message }
    }
  }
}
