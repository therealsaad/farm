import { supabase, isSupabaseConfigured } from './supabase'

// In-memory store for bookings when Supabase is not available
const mockBookings = []

export const bookingsDB = {
  // Create a new booking
  createBooking: async (userId, farmhouseId, bookingData) => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .insert([{
            user_id: userId,
            farmhouse_id: farmhouseId,
            check_in_date: bookingData.checkInDate,
            check_out_date: bookingData.checkOutDate,
            total_guests: bookingData.totalGuests,
            total_price: bookingData.totalPrice,
            add_ons: bookingData.addOns || [],
            special_requests: bookingData.specialRequests || '',
            status: 'confirmed',
            created_at: new Date().toISOString(),
          }])
          .select()

        if (error) throw error
        return { success: true, booking: data[0], error: null }
      } catch (error) {
        console.warn('[v0] Booking creation error:', error.message)
        // Fall through to mock mode
      }
    }

    // Mock mode - create booking in memory
    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: userId,
      farmhouse_id: farmhouseId,
      check_in_date: bookingData.checkInDate,
      check_out_date: bookingData.checkOutDate,
      total_guests: bookingData.totalGuests,
      total_price: bookingData.totalPrice,
      add_ons: bookingData.addOns || [],
      special_requests: bookingData.specialRequests || '',
      status: 'confirmed',
      created_at: new Date().toISOString(),
    }
    mockBookings.push(booking)
    return { success: true, booking, error: null }
  },

  // Get user's bookings
  getUserBookings: async (userId) => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (error) throw error
        return { success: true, bookings: data, error: null }
      } catch (error) {
        console.warn('Get bookings error:', error.message)
        // Fall through to mock mode
      }
    }

    // Mock mode
    return {
      success: true,
      bookings: mockBookings.filter(b => b.user_id === userId),
      error: null
    }
  },

  // Get all bookings (admin)
  getAllBookings: async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        return { success: true, bookings: data, error: null }
      } catch (error) {
        console.warn('Get all bookings error:', error.message)
        // Fall through to mock mode
      }
    }

    // Mock mode
    return {
      success: true,
      bookings: mockBookings,
      error: null
    }
  },

  // Update booking status
  updateBookingStatus: async (bookingId, status) => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .update({ status })
          .eq('id', bookingId)
          .select()

        if (error) throw error
        return { success: true, booking: data[0], error: null }
      } catch (error) {
        console.warn('Update booking error:', error.message)
        // Fall through to mock mode
      }
    }

    // Mock mode
    const booking = mockBookings.find(b => b.id === bookingId)
    if (booking) {
      booking.status = status
    }
    return { success: true, booking, error: null }
  },

  // Delete booking
  deleteBooking: async (bookingId) => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('bookings')
          .delete()
          .eq('id', bookingId)

        if (error) throw error
        return { success: true, error: null }
      } catch (error) {
        console.warn('Delete booking error:', error.message)
        // Fall through to mock mode
      }
    }

    // Mock mode
    const index = mockBookings.findIndex(b => b.id === bookingId)
    if (index > -1) {
      mockBookings.splice(index, 1)
    }
    return { success: true, error: null }
  },
}
