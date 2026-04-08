'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from Supabase or localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check Supabase session first if configured
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.name || session.user.email.split('@')[0],
              role: session.user.user_metadata?.role || 'user',
              avatar: session.user.user_metadata?.avatar || null,
            });
            setToken(session.access_token);
          } else {
            // Fall back to localStorage if no Supabase session
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (storedToken && storedUser) {
              const parsedUser = JSON.parse(storedUser);
              setToken(storedToken);
              setUser(parsedUser);
            }
          }
        } else {
          // Use localStorage if Supabase is not configured
          const storedToken = localStorage.getItem('token');
          const storedUser = localStorage.getItem('user');

          if (storedToken && storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setToken(storedToken);
            setUser(parsedUser);
          }
        }
      } catch (err) {
        console.warn('[v0] Auth initialization error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to Supabase auth changes if configured
    if (isSupabaseConfigured && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.email.split('@')[0],
            role: session.user.user_metadata?.role || 'user',
            avatar: session.user.user_metadata?.avatar || null,
          });
          setToken(session.access_token);
        } else {
          setUser(null);
          setToken(null);
        }
      });

      return () => subscription?.unsubscribe();
    }
  }, []);

  // Login function
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setError(null);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Register function
  const register = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setError(null);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function
  const logout = async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
      } catch (err) {
        console.warn('[v0] Supabase logout error:', err.message);
      }
  };

  // Set error
  const setAuthError = (errorMessage) => {
    setError(errorMessage);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    setAuthError,
    clearError,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
    isSuperAdmin: user?.role === 'superadmin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
